import Head from 'next/head';
import { useState } from 'react';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [boards, setBoards] = useState([
    {
      id: 1,
      title: 'to do',
      items: [
        { id: 1, title: 'todo1' },
        { id: 2, title: 'todo2' }
      ]
    },
    {
      id: 2,
      title: 'in progress',
      items: [
        { id: 3, title: 'todo3' },
        { id: 4, title: 'todo4' }
      ]
    },
    {
      id: 3,
      title: 'done',
      items: [
        { id: 5, title: 'todo5' },
        { id: 6, title: 'todo6' }
      ]
    }
  ]);

  const [currentItem, setCurrentItem] = useState(null);
  const [currentBoard, setCurrentBoard] = useState(null);

  const dragStartHandler = (e, board, item) => {

    setCurrentBoard(board);
    setCurrentItem(item);
  };

  const dragLeaveHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };
  const dragEndHandler = (e) => {
    e.target.style.boxShadow = 'none';
  };
  const dragOverHandler = (e) => {
    e.preventDefault();
    if (e.target.className == 'item') {
      e.target.style.boxShadow = '0 4px 3px gray';
    }
  };

  const dropHandler = (e, board) => {
    debugger
    if (currentBoard == board) {
      console.log('equal');
    } else {
      console.log('not equal');
    }
  };

  const dropCardHandler = (e, board) => {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1);

    setBoards(
      boards.map((b) => {
        if (b.id === board.id) {
          return board;
        }
        if (b.id === currentBoard.id) {
          return currentBoard;
        }
        return b;
      })
    );
    e.target.style.boxShadow = 'none';
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="app">
        {boards.map((board) => (
          <div
            className="board"
            key={board.id}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
          >
            <div className="board__title">{board.title}</div>
            {board.items.map((item) => (
              <div
                key={item.id}
                className="item"
                draggable={true}
                onDragStart={(e) => {
                  dragStartHandler(e, board, item);
                }}
                onDragLeave={(e) => {
                  dragLeaveHandler(e);
                }}
                onDragEnd={(e) => {
                  dragEndHandler(e);
                }}
                onDragOver={(e) => {
                  dragOverHandler(e);
                }}
                onDrop={(e) => {
                  dropHandler(e, board);
                }}
              >
                {item.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
