import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {getRandomPrompt} from '../utils';
import {FormField} from "../components/FormField";
import {Loader} from "../components/Loader";


export const CreatePost = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (form.prompt) {
      console.log(form.prompt)
      try {
        setGeneratingImg(true);
        const response = await fetch('http://localhost:9000/api/v1/icre', {
          method: 'POST',
          headers: {
            'Content-Type':'application/json',
          },
          body: JSON.stringify({
            prompt: form.prompt,
          }),
        });
        const data = await response.json();
        console.log(data)
        // setForm({ ...form, photo:`data:image/jpeg;base64,${data.photo}`||`${data.photo}`});
        setForm({ ...form, photo:`${data.photo}`});
      } catch (err) {
        alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      // console.log("Submited:",form.prompt, form.photo)
      //setLoading(true);
      try {
        const response = await fetch('http://localhost:9000/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...form}),
        });
        let r= await response.json();
        console.log("response:",r)
        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return ( <section className="flex gap-5">
      

   <section className="max-w-7xl mx-auto">
      <div>
        <h3 className="font-extrabold text-[#fffdfd] text-[32px]">Create</h3>
        <p className="mt-2 text-white text-[14px] max-w-[500px]">Create an imaginative images through ICre AI and share it on AI Image Gallery</p>
      </div>

      <form className="mt-10 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          
          <FormField
            labelName="Your Name"
            type="text"
            name="name"
            placeholder="Ex.Gauri Bidwai"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="A painting of Houseboat"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />
          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-64 p-3 h-64 flex justify-center items-center">
            { form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={"https://i.ibb.co/PCXL3tw/preview2.png"}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loader />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-cyan-950 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Generating...' : 'Generate'}
          </button>
        </div>

        <div className="mt-8">
          <p className="mt-2 text-[#020000] text-[15px]">**Once you have created the image you want, you can share it with others in the connections **</p>
          <button
            type="submit"
            className="mt-3 text-white bg-[#008B8B] font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Sharing...' : 'Share to the AI Image Gallery'}
          </button>
        </div>
      </form>
    </section>
    <section  className="max-w-3xl mx-auto">
    <img
                src={"https://i.ibb.co/6gbH9jG/houseboat.png"}
                alt="hb"
                className="w-auto h-auto object-contain mt-10 rounded-md"
              />
    </section>
    </section>
   
  )
}

