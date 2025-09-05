import MenuList from '../MenuList';

function SideBar({ active }) {
  return (
    <div className="bg-gray-300 h-screen">
      <div className="px-10  md:py-10 flex justify-center">
        <h1 className="text-bluewhalelight text-24 font-bold underline">
           <span className="text-green">patel </span>
        </h1>
      </div>
      <MenuList active={active} />
      <div className="block md:hidden px-5">
        <hr></hr>
        <div className="text-white px-3">
          <li className="flex hover:bg-bluewhalelight m-2 py-2 rounded ">
            <img src="/images/icons/vaults.png" alt="menu_item" />
            <span className="pl-2">Logout</span>
          </li>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
