import "./styles.css";
import { useEffect } from "react";

const Title = () => {
  console.log(3);
  useEffect(() => {
    console.log(5);
  }, []);
  console.log(4);
  return <h3>Title</h3>;
};
// * useEffect( callback, dependency array)
// * after render
export default function App() {
  console.log(1);
  useEffect(() => {
    console.log("useEffect");
  }, []);
  console.log(2);
  return (
    <div className="App">
      <Title />
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
