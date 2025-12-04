import MenuList from '../MenuList';

function SideBar({ active }) {
  return (
    <div className="h-[calc(100vh-92px)] bg-gray-50 shadow">
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
