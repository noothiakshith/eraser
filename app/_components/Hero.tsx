import React from 'react';
import Floater from './Floater';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-black">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl text-sky-300">
            Understand User Flow.
            <strong className="font-extrabold text-white sm:block">for engineering teams.</strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed text-white">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="secondary">
              Learn more
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
