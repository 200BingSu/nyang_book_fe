import { useRef } from "react";
import DashBoardItem from "../../components/main/DashBoardItem";
import DataList from "../../components/main/DataList";
import CustomTable from "../../components/main/CustomTable";

const Main = () => {
  const openKeyRef = useRef("");
  return (
    <div className="flex items-start gap-4 h-full ">
      <div className="flex-[1.5] flex flex-col gap-6 h-full">
        {/* <DashBoardItem title="고양이의 미슐랭" addBtn={false} />
        <DashBoardItem title="고양이의 미슐랭" addBtn={false} /> */}
        <div className="flex gap-4 h-full">
          {/* <DashBoardItem title="고양이의 미슐랭" addBtn={false} /> */}
          <DashBoardItem
            title="묘생일지"
            data="diary"
            subTitle="diary"
            addBtn={true}
            onClickAddBtn={() => {}}
            isSelectBox={true}
            openKeyRef={openKeyRef}
            optionList={[
              {
                option_name: "최신순",
                option_value: "created_at",
                option_sort: "DESC",
              },
              {
                option_name: "작성일순",
                option_value: "created_at",
                option_sort: "ASC",
              },
            ]}
            columnList={[
              { column_name: "#", column_value: "index", column_width: 10 },
              {
                column_name: "내용",
                column_value: "diary_content",
                column_width: 65,
              },
              {
                column_name: "작성일",
                column_value: "fm_created_at",
                column_width: 25,
              },
            ]}
            onClickOption={() => {}}
            children={<CustomTable />}
          />
        </div>
      </div>
      <div className="flex-1 ">왼쪽</div>
    </div>
  );
};

export default Main;
