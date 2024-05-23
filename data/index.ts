/**
 * Beskriver en produkt som ska säljas på sidan.
 * OBS: Kan utökas men inte ändras pga cypress.
 **/
import { Product } from "@prisma/client";
import * as Yup from "yup";
//

export interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  phone: string;
  postalCode: string;
}

export const ValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Please enter your email"),
  firstName: Yup.string().required("Please enter your first name"),
  //   lastName: Yup.string().required("Please enter your last name"),
  address: Yup.string().required("Please enter your address"),
  city: Yup.string().required("Please enter your city"),
  phone: Yup.string()
    .matches(
      /^\+46\d{7,9}$|0\d{1,2}-?\d{2,3} ?\d{2} ?\d{2}$|^07\d{1}-?\d{3} ?\d{2} ?\d{2}$/,
      "Invalid phone number format"
    )
    .required("Please enter your phone number"),

  postalCode: Yup.string()
    .matches(/^(\d{3} \d{2}|\d{5})$/, "Invalid postal code format")
    .required("Please enter your postal code"),
});

export const ProductSchema = Yup.object().shape({
  imageUrl: Yup.string()
    .required("Please enter the image url")
    .url()
    .nullable(),
  title: Yup.string().required("Please enter the product title"),
  desc: Yup.string().required("Please enter the product description"),
  category: Yup.string().required("Please select a category"),
  price: Yup.number()
    .transform((value, originalValue) => {
      return originalValue === "" ? NaN : Number(originalValue);
    })
    .required("Please enter the product price")
    .test(
      "is-greater-than-zero",
      "Price must be greater than zero",
      (value) => value > 0
    ),
});

export interface CartItem extends Product {
  quantity: number;
}

/* Lägg till era produkter här */
// export const products: Product[] = [
//   {
//     id: "1",
//     image:
//       "https://www.nordicnest.se/assets/blobs/stolab-carl-matbord-delbart-115-cm-smoked-oak/579053-01_40_EnvironmentImage-aa294b9cb1.jpeg?preset=medium&dpr=2",
//     title: "Divisible dining table",
//     description:
//       "Carl divisible dining table Ø115 cm from Stolab is a round extendable table with space for up to four insert plates. If you want to use the table with more than two insert plates, you need to supplement with a support leg. The soft design language of the Carl table is a tribute to Carl Malmsten and Lilla Åland. The tabletop has a beveled edge and the exposed legs have a pleasantly turned shape. With its soft shapes and classic expression, Carl is a perfect table for the Lilla Åland chairs.",
//     price: 26990,
//   },
//   {
//     id: "2",
//     image:
//       "https://www.nordicnest.se/assets/blobs/woud-arc-soffbord-66-cm-valnot/500782-01_5_EnvironmentImage-58d68ab4fc.jpg?preset=medium&dpr=2",
//     title: "table",
//     description:
//       "Arc coffee table from Danish Woud is made of wood in a soft round shape with three legs designed by Julie Begtrup and Ditte Vad. The table is both beautiful and functional, and under the rotatable table top you will find a hidden storage space for the little things you want close at hand. You can also combine the Arc coffee table with the side table from the same series to create a beautiful furniture group.",
//     price: 10609,
//   },
//   {
//     id: "3",
//     image:
//       "https://www.nordicnest.se/assets/blobs/hoptimist-hoptimist-dog-figur-69-cm-brown/586552-01_40_EnvironmentImage-e6507dde62.jpeg?preset=medium&dpr=2",
//     title: "Hoptimist Dog figurine 6,9 cm",
//     description:
//       "Hoptimist Dog figurine from Danish Hoptimist is a lovingly playful dog for all dog lovers. Just as a dog's great mood is contagious and makes us happy, this adorable Hoptimist dog will jump for joy when you pet it. Animals bring joy to all of us, and in the big family of happy Hoptimists there are of course the cutest animals. Created by Gustav Ehrenreich in the 1960s as an eternal reminder to remain positive and optimistic, this Hoptimist spreads joy and positivity in your home. Let the happy Hoptimist dog brighten your day!",
//     price: 249,
//   },
//   {
//     id: "4",
//     image:
//       "https://www.nordicnest.se/assets/blobs/new-works-kizu-portable-bordslampa-gris-du-marais/513298-01_9_EnvironmentImage-56e2e9c717.jpeg?preset=medium&dpr=2",
//     title: "Kizu portable table lamp",
//     description:
//       "The Kizu portable table lamp from Danish New Works is a portable lamp that is perfect for carrying with you wherever you want. The lamp has a soft design language where the marble lamp base and the single-coloured acrylic lampshade have a small touch surface, which makes it look like the lampshade is balancing on the lamp base. The award-winning Norwegian designer Lars Tornøe is behind the design of this table lamp, which gives off a soft and pleasant glow, where you can easily adjust the light according to occasion and need with the help of the dimmer control in three steps.",
//     price: 2395,
//   },
//   {
//     id: "5",
//     image:
//       "https://www.nordicnest.se/assets/blobs/audo-copenhagen-hashira-cluster-pendel-raw-45-cm/508812-01_5_EnvironmentImage-4d4d99478d.jpg?preset=medium&dpr=2",
//     title: " Hashira Cluster pendant raw",
//     description:
//       "The Hashira Cluster pendant raw from Denmark's Audo Copenhagen is designed by Norm Architects and is a ceiling lamp with a geometric design language consisting of three cylindrical shades that are handmade in beautiful linen fabric. Thanks to the semi-transparent material of the shades, the graphic structure on the inside is highlighted in an effective way when the lamp is lit. The mammoth pendulum hangs from a stylish textile cord and fits just as well over the dining table as it does over the stairs to the upper floor.",
//     price: 9195,
//   },
//   {
//     id: "6",
//     image:
//       "https://www.nordicnest.se/assets/blobs/tradition-in-between-stol-sk1-valnot/28465-04-02-9e7945d410.jpg?preset=medium&dpr=2",
//     title: "In Between chair SK1",
//     description:
//       "The In Between chair from &Tradition is designed by Sami Kallio, a Finnish-Swedish designer specialized in wood and traditional woodworking. To manufacture In Between, two classic techniques are used: Molding to produce the seat and backrest and turning to produce the round legs and armrest. It is a stylish and comfortable chair that fits just as well at the dining table as in the office. The name In Between refers to what distinguishes the chair most, namely the gaps between the backrest and the side panels.",
//     price: 6710,
//   },
//   {
//     id: "7",
//     image:
//       "https://www.nordicnest.se/assets/blobs/ferm-living-ripple-long-drink-glas-4-pack-smoked-grey/31545-02-01-088a7655db.jpg?preset=medium&dpr=2",
//     title: "Ripple long drink glass 4-pack",
//     description:
//       "Ripple long drink glass is a set of four mouth-blown glasses from Ferm Living. The glasses are part of the elegant Ripple series, which is characterized by its ribbed structure, straight lines and sophisticated expression. Just like the other glasses in the series, these also have different geometric shapes, which creates a dynamic and exciting look while also being stackable. These glasses can be used at all types of meals but are also perfect for bubbly, fresh and fruity drinks when the party is a fact!",
//     price: 699,
//   },
//   {
//     id: "8",
//     image:
//       "https://www.nordicnest.se/assets/blobs/fritz-hansen-studio-roso-spegel-rund-gron/37329-01-02-34f4eaece0.jpg?preset=medium&dpr=2",
//     title: "Fritz Hansen's round mirror",
//     description:
//       "Fritz Hansen's round mirror with colored glass that brings to mind watercolor paintings is created by the designer duo Studio Roso consisting of Sophie Nielsen and Rolf Knudsen. The mirror is made of mirror glass that has been colored in a unique way in blue-green shades that change depending on the light in the room and where you look from. With this mirror on the wall, you give the room a lift that is difficult to achieve with a traditional piece of art!",
//     price: 11999,
//   },
// ];
