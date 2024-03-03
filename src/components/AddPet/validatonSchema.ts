import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export const PetSchema = yup.object().shape({
  name: yup.string().required("Необходимое поле!"),
  name_category: yup.string().required("Необходимое поле!"),
  id: yup.number().typeError("Введите число!"),
  select: yup.string(),
  photoUrls: yup.string(),
});
