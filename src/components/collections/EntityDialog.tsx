import { type FormState, type Entity } from '@/types/collections';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/shadcn-ui/dialog';
import EntityForm from './EntityForm';
import { useState, type ReactNode } from 'react';
import { useAuth } from '@clerk/nextjs';

interface Props {
  children: ReactNode;
  type: Entity;
  collectionId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  formDefaults: FormState;
}

export default function EntityDialog({
  children,
  open,
  setOpen,
  type,
  formDefaults,
  collectionId,
}: Props) {
  const [loading, setLoading] = useState(false);
  const { userId } = useAuth();

  if (!userId) return null;

  const closeDialog = () => {
    setOpen(false);
  };

  const isCollection = type === 'collection';
  const entity = isCollection ? 'Collection' : 'Item';

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        onCloseClick={() => closeDialog()}
        onInteractOutside={(e) => {
          if (loading) e.preventDefault();
          else closeDialog();
        }}
        onEscapeKeyDown={(e) => {
          if (loading) e.preventDefault();
          else closeDialog();
        }}>
        <DialogHeader>
          <DialogTitle>New {entity}</DialogTitle>
          <DialogDescription>Create new {entity}</DialogDescription>
        </DialogHeader>
        <EntityForm
          type={type}
          formDefaults={formDefaults}
          userId={userId}
          collectionId={collectionId}
          loading={loading}
          setLoading={setLoading}
          setOpen={setOpen}
        />
      </DialogContent>
    </Dialog>
  );
}
