import Replicate from 'replicate';

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function generateImage(prompt, options) {
  const input = {
    prompt:
      'akira toriyama style, son goku and others heroes together at the beach',
    aspect_ratio: options.aspect_ratio || '1:1',
    output_format: options.output_format || 'webp',
    output_quality: options.output_quality || 80,
    safety_tolerance: 2,
    prompt_upsampling: true,
  };

  const output = await replicate.run('black-forest-labs/flux-1.1-pro', {
    input,
  });
  console.log(output);
}
