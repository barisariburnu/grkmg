import { createFormHook } from "@tanstack/react-form";
import {
  Select,
  SubscribeButton,
  TextArea,
  TextField,
} from "../components/demo.FormComponents.js";
import { fieldContext, formContext } from "./demo.form-context.js";

export const { useAppForm } = createFormHook({
  fieldComponents: {
    TextField,
    Select,
    TextArea,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});
