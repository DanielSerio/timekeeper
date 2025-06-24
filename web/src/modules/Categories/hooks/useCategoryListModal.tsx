import type { CategoryRecord } from "#core/types/models/category.model-types";
import { useState } from "react";

interface CategoryListModalStateObject {
  launched?: Date;
  category?: CategoryRecord;
}

interface OpenEditModalProps extends CategoryListModalStateObject {
  category: CategoryRecord;
  launched?: never;
}

interface OpenCreateModalProps extends CategoryListModalStateObject {
  launched?: never;
  category?: never;
}

interface CreateModalState extends CategoryListModalStateObject {
  launched: Date;
  category?: never;
}

interface EditModalState extends CategoryListModalStateObject {
  launched?: never;
  category: CategoryRecord;
}

export type CategoryListModalState = CreateModalState | EditModalState;

export type OpenCategoryListModalProps =
  | OpenCreateModalProps
  | OpenEditModalProps;

interface CategoryListModalMethods {
  open: (props?: OpenCategoryListModalProps) => void;
  dismiss: () => void;
}

function isEditModalState(obj: object): obj is CreateModalState {
  return "category" in obj && !("launched" in obj);
}

export function useCategoryListModal() {
  const [modalState, setModalState] = useState<CategoryListModalState | null>(
    null
  );

  const methods: CategoryListModalMethods = {
    open: (props?: OpenCategoryListModalProps) => {
      if (!props || !isEditModalState(props)) {
        setModalState({
          launched: new Date(),
        });

        return;
      }

      setModalState(props!);
    },
    dismiss: () => setModalState(null),
  };

  return [modalState, methods] as const;
}
