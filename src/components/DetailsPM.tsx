import React from 'react';

const DetailsPM = () => {
  return (
    <>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center text-sm font-light">
                <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
                  <tr>
                    <th scope="col" className="px-6 py-4 bg-blue-950 text-white"> ค่า PM </th>
                    <th scope="col" className="px-6 py-4 bg-blue-600"> 0-15.0 </th>
                    <th scope="col" className="px-6 py-4 bg-green-600"> 15.1-25.0 </th>
                    <th scope="col" className="px-6 py-4 bg-yellow-300"> 25.1-37.5 </th>
                    <th scope="col" className="px-6 py-4 bg-orange-600"> 37.6-75.0 </th>
                    <th scope="col" className="px-6 py-4 bg-red-600">  {'>'} 75 </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4 font-medium"></td>
                    <td className="whitespace-nowrap px-6 py-4">คุณภาพอากาศดีมาก</td>
                    <td className="whitespace-nowrap px-6 py-4">คุณภาพอากาศดี</td>
                    <td className="whitespace-nowrap px-6 py-4">คุณภาพอากาศปานกลาง</td>
                    <td className="whitespace-nowrap px-6 py-4">คุณภาพอากาศมีผลกระทบต่อสุขภาพ</td>
                    <td className="whitespace-nowrap px-6 py-4">คุณภาพอากาศมีผลกระทบต่อสุขภาพมาก</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailsPM;
