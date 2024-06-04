'use server';

import { auth } from '@/auth';
import { db } from '@/prisma/db';
import { Adress, Category, Product } from '@prisma/client';
import console from 'console';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { OrderWithInformation, ProductWithCategoriesIds } from '../types';

export const getAllProducts = async () => {
  const products = await db.product.findMany({ include: { categories: true } });
  return products;
};

export const getAllCategorys = async () => {
  const categorys = await db.category.findMany({});
  return categorys;
};

export async function getProductsByCategorySlug(slug: string) {
  const category = await db.category.findUnique({ where: { slug: slug } });
  const products = await db.product.findMany({
    where: { categories: { some: { id: category?.id } } },
    include: { categories: true },
  });
  return { category, products };
}

export const createProduct = async (values: ProductWithCategoriesIds) => {
  await db.product.create({
    data: {
      title: values.title,
      imageUrl: values.imageUrl,
      desc: values.desc,
      stock: Number(values.stock),
      price: Number(values.price),
      isArchived: false,
      categories: {
        connect: values.categories.map((id) => ({
          id,
        })),
      },
    },
  });
  revalidatePath('/admin/products');
};

export const updateProduct = async (values: ProductWithCategoriesIds) => {
  const session = await auth();
  if (!session?.user.isAdmin) return null;

  await db.category.findMany({});
  await db.product.update({
    where: { id: values.id },
    data: { isArchived: true },
  });

  await db.product.create({
    data: {
      title: values.title,
      imageUrl: values.imageUrl,
      desc: values.desc,
      stock: Number(values.stock),
      price: Number(values.price),
      isArchived: false,
      categories: {
        connect: values.categories.map((id) => ({ id })),
      },
    },
  });

  revalidatePath('/admin');
};

export async function deleteProduct(productId: number) {
  try {
    await db.product.delete({
      where: {
        id: productId,
      },
    });
  } catch (error) {
    throw error;
  }
}

export const updateStock = async (productId: number, quantity: number) => {
  try {
    const product = await db.product.findUnique({ where: { id: productId } });

    if (!product) {
      throw new Error('Product not found');
    }

    if (product.stock < quantity) {
      throw new Error('Insufficient stock');
    }

    await db.product.update({
      where: { id: productId },
      data: { stock: product.stock - quantity },
    });

    return true;
  } catch (error) {
    console.error('Error updating stock:', error);
    throw error;
  }
};

export const createCategory = async (values: Category) => {
  const session = await auth();
  if (!session?.user.isAdmin) return null;

  const categorys = await db.category.findMany({});
  const doesCategoryExist = categorys.find((c) => c.name === values.name);

  if (doesCategoryExist) return { status };

  await db.category.create({
    data: values,
  });
};

export const editSendStatus = async (values: OrderWithInformation) => {
  const session = await auth();
  if (!session?.user.isAdmin) return null;
  const findOrder = await db.order.findFirst({ where: { id: values.id } });
  await db.order.update({
    where: { id: values.id },
    data: { sentStatus: !findOrder?.sentStatus },
  });
  revalidatePath('/admin/orders');
};

export const saveAddress = async (adressData: Adress) => {
  const session = await auth();
  if (!session?.user) return null;

  try {
    const address = await db.adress.create({
      data: {
        street: adressData.street,
        zip: adressData.zip,
        city: adressData.city,
        email: adressData.email,
      },
    });
    return address.id;
  } catch (error) {
    console.error('Error saving address:', error);
    throw error;
  }
};

export const createOrder = async (
  cart: (Product & { quantity: number })[],
  shippingAddressId: number,
) => {
  const session = await auth();

  if (!session) return redirect('/signin');

  try {
    const totalPrice = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order = await db.order.create({
      data: {
        userId: session.user.id,
        createdAt: new Date(),
        total: totalPrice,
        shippingAddressId: shippingAddressId,
        orderRows: {
          create: cart.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            subTotal: item.price * item.quantity,
          })),
        },
      },
    });

    await Promise.all(cart.map((item) => updateStock(item.id, item.quantity))); // parallelt

    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const deleteOrder = async (orderId: number) => {
  try {
    const session = await auth();
    if (!session?.user.isAdmin) return null;

    await db.orderRow.deleteMany({
      where: {
        orderId: orderId,
      },
    });

    await db.order.delete({
      where: {
        id: orderId,
      },
    });
    console.log('Order deleted successfully');
    revalidatePath('/admin/orders');
    return { success: true };
  } catch (error) {
    console.error('Failed to delete order:', error);
    return { success: false, error: error };
  }
};

// export const createOrderRow = async (
//   orderId: number,
//   productId: number,
//   quantity: number,
//   subTotal: number,
// ) => {
//   return runAction(async () => {
//     const orderRow = await db.orderRow.create({
//       data: {
//         orderId: orderId,
//         productId: productId,
//         quantity: quantity,
//         subTotal: subTotal,
//       },
//       include: {
//         order: true,
//         product: true,
//       },
//     });
//     return orderRow;
//   })
// };

// function runAction<T>(
//   callback: () => Promise<T>,
// ) {
//   try {
//     return callback();
//   } catch (error: unknown) {
//     // if (error instanceof z.ZodError)
//     // Pinga Discord/Slack
//     // process.env.NODE_ENV === 'development'
//     console.error(error);
//     throw error;
//   }
// }
