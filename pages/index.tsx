import { Button } from "@shopify/polaris";

const Main = () => {
  return (
    <div className="flex flex-col p-10">
      <div className="mb-8 p-4 ">
        <button className="border p-8 rounded-md shadow-lg">
          Hey Tailwind!
        </button>
      </div>
      <div className="flex mt-8">
        <Button primary> I am Polaris button </Button>
      </div>
    </div>
  );
};

export default Main;
