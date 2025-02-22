import Form from './Form';
import Input from './Input';
import InputContainer from './InputContainer';
import Label from './Label';
import { useActionState } from 'react';
import { useAuthContext } from '../store/auth-context';

async function sendImagesRequest(prompt, options, authToken) {
  const response = await fetch('http://localhost:3000/generate-image', {
    method: 'POST',
    body: JSON.stringify({ prompt, options }),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to generated image, check your input please');
  }

  const imageBlob = await response.blob();
  return URL.createObjectURL(imageBlob);
}

const ImageGeneration = () => {
const {token} = useAuthContext()

  async function submitAction(_, formData) {
    const prompt = formData.get('prompt');
    const options = {
      quality: formData.get('quality'),
      aspect_ratio: formData.get('aspectRatio'),
      format: formData.get('format'),
    };
    try {
      const imageUrl = await sendImagesRequest(prompt, options, token);
      return { result: 'success', imageUrl, prompt };
    } catch (error) {
      return { result: 'error', message: error.message };
    }
  }

  const [formState, action, isPending] = useActionState(submitAction, {
    result: null,
  });

  return (
    <div className='flex flex-col md:flex-row gap-4 max-w-[70rem] mx-auto items-start'>
      <Form
        action={action}
        className='flex flex-col w-[25rem] justify-between gap-8'
      >
        <div className='flex flex-col gap-4'>
          <InputContainer>
            <Label htmlFor='prompt'>Image Prompt</Label>
            <Input
              type='text'
              id='prompt'
              name='prompt'
              min=''
              max=''
              step=''
              defaultValue=''
              isTextArea
            />
          </InputContainer>
          <div className='flex gap-5'>
            <InputContainer>
              <Label htmlFor='quality'>Quality</Label>
              <Input
                type='number'
                id='quality'
                name='quality'
                min='1'
                max='100'
                step='1.0'
                defaultValue='80'
                className='w-[4rem]'
              />
            </InputContainer>
            <InputContainer>
              <Label htmlFor='aspectRatio'>AspectRatio</Label>
              <select
                id='aspectRatio'
                name='aspectRatio'
                className='p-[0.6rem] rounded-sm w-[6rem]'
              >
                <option value='1:1'>1:1</option>
                <option value='16:9'>16:9</option>
                <option value='4:3'>4:3</option>
              </select>
            </InputContainer>
            <InputContainer>
              <Label htmlFor='format'>Format</Label>
              <select
                name='format'
                id='format'
                defaultValue='png'
                className='p-[0.6rem] rounded-sm w-[5rem]'
              >
                <option value='webp'>WebP</option>
                <option value='png'>PNG</option>
                <option value='jpg'>JPG</option>
              </select>
            </InputContainer>
          </div>
        </div>
        <div className='flex justify-end '>
          <button
            disabled={isPending}
            className='bg-sky-400 min-w-[10rem] text-black py-3 rounded-lg hover:bg-sky-500 disabled:cursor-not-allowed disabled:bg-stone-400'
          >
            {isPending ? 'Generating...' : 'Generate'}
          </button>
        </div>
      </Form>
      <div className='test h-[25rem] w-[25rem] flex-1 flex justify-center items-start'>
        {!formState.result && (
          <p className='text-stone-400 p-8 font-mono'>
            Press "Create" to generate an image
          </p>
        )}
        {formState.result === 'success' && (
          <img src={formState.imageUrl} alt={formState.prompt} className='w-full shadow-2xl rounded-md'/>
        )}
        {formState.result === 'error' && <p className='text-red-200'>{formState.message}</p>}
      </div>
    </div>
  );
};

export default ImageGeneration;
