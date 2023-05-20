interface Props {
  entity: string;
  entityName: string;
}

export default function GalleryNotFound({ entity, entityName }: Props) {
  return (
    <div className='mt-8 flex flex-col items-center'>
      <h4 className='text-xl font-bold text-gray-400'>
        No {entityName} found.
      </h4>
      <p className='text-m text-gray-400'>Create one using the plus symbol</p>
    </div>
  );
}
