interface Props {
  message: string;
}

export default function ErrorPage({ message }: Props) {
  return (
    <div className='mt-16 flex w-full flex-col items-center'>
      <h4 className='text-xl font-bold text-gray-400'>
        Something went wrong 😱
      </h4>
      <p className='text-m text-gray-400'>Error message: {message}</p>
    </div>
  );
}
