import { useRef } from "react";
import DashBoardItem from "../../components/main/DashBoardItem";

const Main = () => {
  const openKeyRef = useRef("");
  return (
    <div className="flex items-start h-full ">
      <div className="flex-[1.5] flex flex-col gap-6 h-full">
        {/* <DashBoardItem title="고양이의 미슐랭" addBtn={false} />
        <DashBoardItem title="고양이의 미슐랭" addBtn={false} /> */}
        <div className="flex gap-4 h-full">
          {/* <DashBoardItem title="고양이의 미슐랭" addBtn={false} /> */}
          <DashBoardItem
            title="title"
            subTitle=""
            addBtn={true}
            onClickAddBtn={() => {}}
            isSelectBox={true}
            openKeyRef={openKeyRef}
            optionList={[
              { option_name: "option_name", option_value: "option_value" },
            ]}
            onClickOption={() => {}}
          />
        </div>
      </div>
      <div className="flex-1 ">왼쪽</div>
    </div>
  );
};

export default Main;
