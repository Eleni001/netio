import { Checkbox } from "@chakra-ui/react";

function CategoryBox({ category, field, form }: any) {
  const handleChange = () => {
    const set = new Set(field.value);
    if (set.has(category.name)) {
      set.delete(category.name);
    } else {
      set.add(category.name);
    }
    form.setFieldValue(field.name, Array.from(set));
  };

  return (
    <Checkbox
      isChecked={field.value.includes(category.name)}
      onChange={handleChange}
    >
      {category.name}
    </Checkbox>
  );
}

export default CategoryBox;
