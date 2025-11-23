import { useRef, useState } from "react";
import DashBoardItem from "../../components/main/DashBoardItem";
import { COLUMN_TYPE } from "../../types/SearchInterface";
import { initDiaryColumnList } from "../../constants/initData";

const Main = () => {
  const openKeyRef = useRef("");

  const [diaryColumnList, setDiaryColumnList] = useState(initDiaryColumnList);

  return (
    <div className="flex items-start gap-4 h-full ">
      <div className="flex-[1.5] flex flex-col gap-6 h-full">
        {/* <DashBoardItem title="고양이의 미슐랭" addBtn={false} />
        <DashBoardItem title="고양이의 미슐랭" addBtn={false} /> */}
        <div className="flex gap-4 h-full">
          {/* <DashBoardItem title="고양이의 미슐랭" addBtn={false} /> */}
          <DashBoardItem
            type="custom_table"
            title="묘생일지"
            url="/diary"
            data="diary"
            subTitle="diary"
            addBtn={true}
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
            columnList={diaryColumnList}
            detailColumnList={[
              {
                column_name: "내용",
                column_value: "diary_content",
                column_width: 70,
                column_align: "start",
                column_type: COLUMN_TYPE.TEXTAREA,
              },
            ]}
          />
        </div>
      </div>
      <div className="flex-1 ">
        <DashBoardItem
          title="구매목록"
          url="/purchases"
          data="purchases"
          subTitle="purchases"
          addBtn={true}
          isSelectBox={true}
          openKeyRef={openKeyRef}
          type="custom_table"
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
              column_name: "브랜드",
              column_value: "brand_name",
            },
            {
              column_name: "제품명",
              column_value: "product_name",
            },
            {
              column_name: "선호",
              column_value: "like_point",
              column_type: COLUMN_TYPE.NUMBER,
            },
            {
              column_name: "작성일",
              column_value: "created_at",
            },
          ]}
          detailColumnList={[
            {
              column_name: "제품",
              column_value: "product_key",
              column_type: COLUMN_TYPE.SEARCH,
            },
            {
              column_name: "선호",
              column_value: "like_point",
              column_type: COLUMN_TYPE.LIKEPOINT,
            },
            {
              column_name: "작성일",
              column_value: "created_at",
              column_type: COLUMN_TYPE.DATETIME,
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Main;
