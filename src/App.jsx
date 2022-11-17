import "./App.scss";
import React, { useState } from "react";
import rawBooks from "./data/books.json";
import {
  AiOutlineShoppingCart,
  AiOutlineVideoCamera,
  AiFillLike,
} from "react-icons/ai";

const password = "123";
const _books = [];
rawBooks.forEach((rawBook) => {
  const book = {
    ...rawBook,
    isLiked: false,
  };
  _books.push(book);
});

function App() {
  const [userIsOnline, setUserIsOnline] = useState(false);
  const [userPassword, setUserPassword] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filteredBooks, setFilteredBooks] = useState(_books);
  const [books, setBooks] = useState(_books);

  const handleLogin = (e) => {
    e.preventDefault();
    if (userPassword === password) {
      setUserIsOnline(true);
    }
  };
  const handelSearch = (e) => {
    const _searchText = e.target.value;
    const _filteredBooks = books.filter((book) =>
      book.title.toLocaleLowerCase().includes(_searchText.toLocaleLowerCase())
    );
    setFilteredBooks([..._filteredBooks]);
    setSearchText(_searchText);
    setUserIsOnline(true);
  };

  const handleChangeLiked = (book) => {
    book.isLiked = !book.isLiked;
    setBooks([...books]);
  };

  return (
    <div className="App">
      <h1>Books info site</h1>

      <form>
        Password:{" "}
        <input
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
        />
        <button onClick={handleLogin}>Login</button>
      </form>
      <div className="userStatus">
        {userIsOnline && <div>user is Online</div>}

        <img
          src="https://dl.hiapphere.com/data/icon/201405/HiAppHere_com_com.decad3nce.hoverbrowser.png"
          className={userIsOnline ? "moveY" : "moveX"}
        />
        <div className="password">
          {userIsOnline ? <span>😎️</span> : <span>123</span>}
        </div>
      </div>
      <hr />
      {userIsOnline ? (
        <div>user doesn't need to login</div>
      ) : (
        <div>user needs to login</div>
      )}
      <hr />

      <div style={{ color: userIsOnline ? "green" : "red" }}>Information</div>
      <hr />
      <div className={userIsOnline ? "fileExists" : "fileIsDeleted"}>
        {!userIsOnline ? "Key" : "Data"}
      </div>
      <hr />

      {userIsOnline && (
        <div className="info">
          <div className="numberOfBooks">
            <h2 className="numberOfLength">
              There are {filteredBooks.length} books:
            </h2>
            <div className="numberOfLikes">
              Number of likes:{" "}
              {books.reduce((acc, cur) => acc + (cur.isLiked ? 1 : 0), 0)}
            </div>

            <input
              value={searchText}
              placeholder="Search ..."
              onChange={(e) => handelSearch(e)}
              className="search"
            />
          </div>
          <div>
            {filteredBooks.map((book, i) => {
              return (
                <div key={i} className="container">
                  <img
                    src={`https://edwardtanguay.vercel.app/customImages/techBooks/${book.idCode}.jpg`}
                  />

                  <div className="textDiv">
                    <h3 className="title">{book.title}</h3>

                    <span className="published">
                      <i>published {book.yearMonth}</i>
                    </span>
                    <div className="isLiked">
                      <AiFillLike
                        className={
                          book.isLiked ? "starIsLiked" : "starNotLiked"
                        }
                        onClick={() => handleChangeLiked(book)}
                      />

                      <p>{book.isLiked ? "liked" : "not liked"}</p>
                    </div>
                    <div></div>
                    <p>
                      <span className="description"> Description:</span>{" "}
                      {book.description}
                    </p>
                    <div className="iconsContainer">
                      <div className="language">
                        <img
                          className="flag"
                          src={
                            book.language === ""
                              ? "https://cdn-icons-png.flaticon.com/512/197/197374.png"
                              : "https://cdn-icons-png.flaticon.com/512/197/197560.png"
                          }
                          alt=""
                        />
                        <span
                          className={
                            book.language === "" ? "english" : "french"
                          }
                        >
                          {book.language === "" ? "English" : "French"}
                        </span>
                      </div>

                      <div className="icons">
                        <a
                          href={`https://www.youtube.com/results?search_query=${book.idCode}`}
                          target="_blank"
                        >
                          <AiOutlineVideoCamera />
                        </a>

                        <a
                          href={`https://www.google.com/search?q=${book.title}`}
                          target="_blank"
                        >
                          <AiOutlineShoppingCart />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
