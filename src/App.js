import "./styles.css";
import { useEffect, useState } from "react";

const UserCard = ({ id, name, url, avatar }) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "2rem",
        border: "2px solid red",
        padding: "1rem",
        margin: "1.5rem",
        background: "antiquewhite"
      }}
    >
      <img width="50" src={avatar} alt={id} />
      <div>
        <div>{name}</div>
        <div>{url}</div>
      </div>
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, onClickCallback }) => {
  const pages = new Array(totalPages).fill(0).map((a, i) =>
    i + 1 === currentPage ? (
      <button disabled style={{ background: "olive" }} key={i}>
        {i + 1}
      </button>
    ) : (
      <button onClick={() => onClickCallback(i + 1)} key={i}>
        {i + 1}
      </button>
    )
  );
  return <div style={{ display: "flex", gap: "1rem",marginLeft: 30 }}>{pages}</div>;
};

// * useEffect( callback, dependency array)
// * after render
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  console.log(`inside app`);
  const getUsers = ({ query = "masai", page = 1 }) => {
    return fetch(
      `https://api.github.com/search/users?q=${query}&page=${page}`
    ).then((res) => res.json());
  };
  // On Mounting
  useEffect(() => {
    getUsers({
      page
    })
      .then((res) => {
        setData(res);
        if (res.total_count) {
          const totalPages = Math.ceil(res.total_count / 30);
          setTotalPages(totalPages);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [page]);
  // * EMPTY DEPENDANCY ARRAY
  // if(isLoading){
  //   return <h3>Loading...</h3>
  // }

  const handlePageChange = (value) => {
    setPage(value);
  };
  return (
    <div className="App">
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <>
          {data?.items?.map((user) => (
            <UserCard
              key={user.id}
              id={user.login}
              name={user.login}
              url={user.url}
              avatar={user.avatar_url}
            />
          ))}
          <Pagination
            currentPage={page}
            onClickCallback={handlePageChange}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
