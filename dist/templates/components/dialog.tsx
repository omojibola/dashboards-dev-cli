import * as Dialog from '@radix-ui/react-dialog';
import { Button } from './button';

export function DemoDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button variant='secondary'>Open dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className='fixed inset-0 bg-black/40' />
        <Dialog.Content className='fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow'>
          <Dialog.Title className='text-lg font-semibold mb-2'>
            Hello 👋
          </Dialog.Title>
          <Dialog.Description className='text-sm text-gray-600 mb-4'>
            This is a demo dialog built with Radix UI and Tailwind.
          </Dialog.Description>
          <Dialog.Close asChild>
            <Button>Close</Button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
