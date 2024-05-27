import { Checkbox } from "@chakra-ui/react";
import { Category } from "@prisma/client";

interface Props {
  category: Category;
  field: any;
  form: any;
}

function CategoryBox({ category, field, form }: Props) {
  const handleChange = () => {
    const set = new Set(field.value);
    if (set.has(category.id)) {
      set.delete(category.id);
    } else {
      set.add(category.id);
    }
    form.setFieldValue(field.name, Array.from(set));
  };

  return (
    <Checkbox
      isChecked={field.value.includes(category.id)}
      onChange={handleChange}
    >
      {category.name}
    </Checkbox>
  );
}

export default CategoryBox;
