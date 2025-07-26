import { getSession, GetSessionParams } from 'next-auth/react';
// import Head from 'next/head';
import { useEffect, useState } from 'react';
import React, { FC } from 'react';
import { mutate } from 'swr';
import Board from '@/components/Board/Board';
import Layout from '@/components/Layout/Layout';
import TaskDetails from '@/components/Modals/TaskDetails';
import Spinner from '@/components/Spinner/Spinner';
import useModal from 'hooks/useModal';
import { useBoardsContext } from 'store/BoardListContext';
import Header from '@/components/Layout/Header/Header';
import { Card, CardContent } from '@/components/ui/card';
import SideBar from '@/components/ui/mainSideBar';
import { Calendar1, Clock, EditIcon } from 'lucide-react';
import { MdEmail } from 'react-icons/md';
import Input from '@/components/ui/Search';
import Comp from "@/components/ui/comp-409";
import UserAvatar from "@/components/ui/comp-377";
import BoardNotify from '@/components/board-notification/index'
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import BoardList from '@/components/BoardList/BoardList';
import Link from 'next/link';
import Image from 'next/image';

// import type { Board } from 'types';


// interface CircularProgressProps {
//   percentage: number;
//   size?: number;
//   strokeWidth?: number;
//   circleColor?: string;
//   progressColor?: string;
// }

const BoardLink: FC<{ board }> = ({ board }) => {
  // const isActive = router.query.boardId === board.uuid;
// const imageUrl = `https://picsum.photos/seed/${board.uuid}/400/200`;
 const [imageUrl, setImageUrl] = useState("/fallback.jpg");


  useEffect(() => {
    const fetchImage = async () => {
      try {
        const res = await fetch(`/api/board-image?q=${board.name}`);
        const data = await res.json();
        if (data.imageUrl) {
          setImageUrl(data.imageUrl);
        }
      } catch (err) {
        console.error("Image fetch error:", err);
      }
    };

    fetchImage();
  }, [board.name]);

  return (
     <Link
      href={`/board/${board.uuid}`} className="">
        <Card>
          <CardContent className="h-52 w-64 p-0 overflow-hidden border-none shadow-md rounded-lg">
      <div className="relative h-36 w-full">
        <Image
          src={imageUrl}
          alt="Nature"
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority
        />
      </div>
      <div className="dark:bg-[#1e1e1f] bg-[#f9f9fa] overflow-hidden text-start h-full p-2 dark:text-white text-ellipsis whitespace-nowrap capitalize text-base font-normal">
        {board.name}
      </div>
        </CardContent>
      </Card>
    </Link>
  );
};


export default function BoardPage({
  size = 130,
  strokeWidth = 5,
  circleColor = "#fff000",
  progressColor = "#4CD964",
  handleBoardSelect,
}) {
  const { selectedBoard, selectedTask, setSelectedTask, isLoading, boards, isValidating } = useBoardsContext();
  const taskDetailsModal = useModal();
  const Modal = taskDetailsModal.Component;

  // Compute percentage safely after selectedBoard is available
  const percentage =
    selectedBoard && selectedBoard.columns && selectedBoard.columns.length > 2 && Array.isArray(selectedBoard.columns[2]?.tasks)
      ? selectedBoard.columns[2].tasks.length
      : 0;

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  useEffect(() => {
    if (selectedTask) {
      taskDetailsModal.open();
    }
  }, [selectedTask , taskDetailsModal]);

  useEffect(() => {
    if (selectedBoard && !taskDetailsModal.isOpen) {
      setSelectedTask(null);
      mutate(`/api/boards/${selectedBoard.uuid}`);
    }
  }, [taskDetailsModal.isOpen]);

  const boardSelectHandler = () => {
    handleBoardSelect && handleBoardSelect();
  };

  return (
    <div className='flex '>
      <SideBar />
      <Layout>

        <div className="w-full">
          <div className=' flex w-full justify-between items-center px-4 pt-4 gap-4 '>
            <div className="w-full flex gap-4 justify-start items-center">
            <Input />
         <BoardList />
         </div>
       
            <div className="w-full flex px-1 justify-end items-center gap-16">
              <div className="flex justify-center items-center gap-4">
                <Comp />
                <button className="w-fit py-1.5 font-semibold px-4 text-sm  text-white bg-blue-600 rounded-md transition hover:bg-blue-700 focus:outline-none">
                  Invite
                </button>
              </div>
              <div className="flex justify-center items-center gap-4">
                <ThemeToggle />
                <  Calendar1  className='p-2 border rounded-md h-9 w-9 shadow-sm' />
                <BoardNotify />
                <UserAvatar />
              </div>
            </div>
          </div>
          <div className="flex ">
            <main className="text-semibold bg-white/30 z-50 dark:bg-black/50 min-w-[60%] w-full max-w-[74vw] box-shadow dark:shadow-none rounded-2xl m-4 min-h-[88vh] max-h-[89vh] thin-scrollbar overflow-scroll px-4 py-4 text-center font-jakarta text-lg text-mid-grey">

              
              {selectedBoard ? (
                <div className="">
                  <Header />
                <Board boardUUID={selectedBoard.uuid} />
                </div>
              ) : (
                <div className="flex h-full items-center justify-center ">

                  {isLoading || isValidating ? (
                    <Spinner />
                  ) : (
                   <div className="max-h-[95%]  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 px-4">
  {boards?.map((board) => (
    <div key={board.uuid} onClick={boardSelectHandler}>
      <BoardLink board={board} />
    </div>
  ))}
</div>
                  )}
                </div>
              )}
              <Modal>
                {selectedBoard && selectedTask && (
                  <TaskDetails
                    closeModal={taskDetailsModal.close}
                    taskUUID={selectedTask}
                    columns={selectedBoard.columns}
                  />
                )}
             </Modal>
            </main>

            
            <div className="">
              <Card className=" w-72 p-4 mt-4 max-h-full mx-2 dark:border rounded-2xl box-shadow dark:shadow-none">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2 bg-muted/90 p-4 rounded-2xl">
                    <h3 className="font-semibold capitalize ">{selectedBoard?.name}</h3>
                    <span className="text-xs font-medium bg-orange-100 text-orange-600 px-2 py-1 rounded">SELECTED</span>
                  </div>
                </div>
                <div className="relative flex justify-center items-center  py-2 w-38 h-fit mx-auto">
                  
                   <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={circleColor}
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center dark:text-white font-bold">
        {percentage}%
      </div>
    </div>
                </div>
                <div className="py-2">
                  <h1 className='font-semibold text-[18px] capitalize'>{selectedBoard?.name}</h1>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-3 rounded-xl">
                    <div className="text-sm text-gray-600">Total</div>
                    <div className="text-xl dark:text-black font-semibold">{selectedBoard?.columns.length}</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded-xl">
                    <div className="text-sm text-gray-600">
                      {selectedBoard?.columns && selectedBoard.columns.length > 0
                        ? selectedBoard.columns[0].name
                        : 'No columns'}
                    </div>
                    <div className="text-xl dark:text-black font-semibold">{selectedBoard?.columns && selectedBoard.columns.length > 0 ? selectedBoard.columns[0]?.tasks?.length ?? 0 : 0}</div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-xl">
                    <div className="text-sm text-gray-600"> {selectedBoard?.columns && selectedBoard.columns.length > 1
                        ? selectedBoard.columns[1].name
                        : 'No columns'}</div>
                    <div className="text-xl dark:text-black font-semibold">{selectedBoard?.columns[1]?.tasks?.length || "0"}</div>
                  </div>
                  <div className="bg-orange-50 p-3 rounded-xl">
                    <div className="text-sm text-gray-600"> {selectedBoard?.columns && selectedBoard.columns.length > 2
                        ? selectedBoard.columns[2].name
                        : 'No columns'}</div>
                    <div className="text-xl dark:text-black font-semibold">0</div>
                  </div>
                </div>
              </Card>
              <Card className='p-4 mt-4 max-h-full space-y-4 mx-2 border-none rounded-2xl box-shadow dark:shadow-none'>
                <div className="flex gap-3 justify-start items-center">
                  <Clock className='text-white p-2 h-9 w-9 bg-purple-400 rounded-sm' />
                  <div className="mr-10">
                    <p className='text-sm font-semibold text-neutral-500'>{selectedBoard?.created_at
                      ? new Date(selectedBoard.created_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long'
                        }).toLowerCase()
                      : ''}</p>
                    <p className='text-md font-semibold'>
                      {selectedBoard?.created_at
                      ? new Date(selectedBoard.created_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                        })
                      : ''}
                    </p>
                  </div>
                  <EditIcon className='h-5 w-5' />
                </div>
                <hr />
                <div className="flex gap-3 justify-start items-center">
                  <MdEmail className='text-white p-2 h-9 w-9 bg-blue-500 rounded-sm' />
                  <div className="mr-10">
                    <p className='text-sm font-semibold text-neutral-500'>{selectedBoard?.updated_at
                      ? new Date(selectedBoard.updated_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          day: '2-digit',
                          month: 'long'
                        }).toLowerCase()
                      : ''}</p>
                    <p className='text-md font-semibold'>{selectedBoard?.updated_at
                      ? new Date(selectedBoard.updated_at).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                        })
                      : ''}</p>
                  </div>
                  <EditIcon className='h-5 w-5' />
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: GetSessionParams) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
