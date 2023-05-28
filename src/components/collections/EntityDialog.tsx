import { type FormState, type Entity } from '@/types/collections';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn-ui/dialog';
import EntityForm from './EntityForm';
import { useState, type ReactNode } from 'react';
import { useAuth } from '@clerk/nextjs';

interface Props {
  children: ReactNode;
  editing: boolean;
  type: Entity;
  entityId?: string;
  collectionId?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  formDefaults: FormState;
}

export default function EntityDialog({
  children,
  open,
  setOpen,
  editing,
  entityId,
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
      {children}
      <DialogContent
        onClick={(e) => e.stopPropagation()}
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
          <DialogTitle>
            {editing ? 'Edit' : 'New'} {entity}
          </DialogTitle>
          {!editing && (
            <DialogDescription>Create new {entity}</DialogDescription>
          )}
        </DialogHeader>
        <EntityForm
          entityId={entityId}
          editing={editing}
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
