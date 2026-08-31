import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsPencil, BsLink45Deg } from "react-icons/bs";
import { BiSolidPencil } from "react-icons/bi";
import { HiOutlinePlusCircle } from "react-icons/hi";
import { RxDragHandleDots2 } from "react-icons/rx";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CourseContent = ({
  courseContentData,
  setCourseContentData,
  active,
  setActive,
  handleSubmit: handleCourseSubmit,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(
    Array(courseContentData?.length || 0).fill(false),
  );
  const [activeSection, setActiveSection] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleCollapseToggle = (index) => {
    const updatedCollapsed = [...isCollapsed];
    updatedCollapsed[index] = !updatedCollapsed[index];
    setIsCollapsed(updatedCollapsed);
  };

  const handleRemoveLink = (index, linkIndex) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.splice(linkIndex, 1);
    setCourseContentData(updatedData);
  };

  const handleAddLink = (index) => {
    const updatedData = [...courseContentData];
    updatedData[index].links.push({ title: "", url: "" });
    setCourseContentData(updatedData);
  };

  const newContentHandler = (item) => {
    if (
      item.title === "" ||
      item.videoUrl === "" ||
      item.description === "" ||
      item.links[0].title === "" ||
      item.links[0].url === ""
    ) {
      alert("Please fill all fields before adding new content!");
      return;
    }

    let newVideoSection = item.videoSection;

    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: newVideoSection,
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  const addNewSectionHandler = () => {
    if (
      courseContentData[courseContentData.length - 1].title === "" ||
      courseContentData[courseContentData.length - 1].videoUrl === "" ||
      courseContentData[courseContentData.length - 1].description === "" ||
      courseContentData[courseContentData.length - 1].links[0].title === "" ||
      courseContentData[courseContentData.length - 1].links[0].url === ""
    ) {
      alert("Please fill all fields first!");
      return;
    }

    setActiveSection(activeSection + 1);

    const newContent = {
      videoUrl: "",
      title: "",
      description: "",
      videoSection: `Untitled Section ${activeSection + 1}`,
      links: [{ title: "", url: "" }],
    };

    setCourseContentData([...courseContentData, newContent]);
  };

  return (
    <div className="m-auto  p-3">
      <form onSubmit={handleSubmit}>
        {courseContentData?.map((item, index) => {
          const showSectionInput =
            index === 0 ||
            item.videoSection !== courseContentData[index - 1].videoSection;

          return (
            <div
              key={index}
              className={`w-full bg-[#cdc8c817] p-4 ${
                showSectionInput ? "" : "mb-0"
              }`}
            >
              {showSectionInput && (
                <div className="flex w-full items-center mb-4">
                  <input
                    type="text"
                    placeholder="Section title"
                    className={`text-[20px] ${
                      item.videoSection === "Untitled Section"
                        ? "w-[170px]"
                        : "w-min"
                    } font-Poppins cursor-pointer dark:text-white text-black bg-transparent outline-none`}
                    value={item.videoSection}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoSection = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                  <BiSolidPencil className="cursor-pointer dark:text-white text-black ml-2" />
                </div>
              )}

              <div className="flex w-full items-center justify-between my-2">
                {isCollapsed[index] ? (
                  item.title ? (
                    <p className="font-Poppins dark:text-white text-black">
                      {index + 1}. {item.title}
                    </p>
                  ) : (
                    <></>
                  )
                ) : (
                  <div></div>
                )}

                <div className="flex items-center">
                  <AiOutlineDelete
                    className={`dark:text-white text-black text-[20px] mr-2 ${
                      index === 0 ? "cursor-no-drop" : "cursor-pointer"
                    }`}
                    onClick={() => {
                      if (index > 0) {
                        const updatedData = [...courseContentData];
                        updatedData.splice(index, 1);
                        setCourseContentData(updatedData);
                      }
                    }}
                  />
                  <RxDragHandleDots2
                    className="dark:text-white text-black text-[20px] cursor-pointer"
                    onClick={() => handleCollapseToggle(index)}
                  />
                </div>
              </div>

              {!isCollapsed[index] && (
                <>
                  <div className="my-3">
                    <label className="text-[16px] text-black dark:text-white font-Poppins">
                      Video Title
                    </label>
                    <input
                      type="text"
                      placeholder="Project Plan..."
                      className="w-full mt-2 p-2 border border-gray-600 rounded bg-transparent dark:text-white text-black outline-none"
                      value={item.title}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].title = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="text-[16px] text-black dark:text-white font-Poppins">
                      Video Url
                    </label>
                    <input
                      type="text"
                      placeholder="sdder"
                      className="w-full mt-2 p-2 border border-gray-600 rounded bg-transparent dark:text-white text-black outline-none"
                      value={item.videoUrl}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].videoUrl = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="text-[16px] text-black dark:text-white font-Poppins">
                      Video Description
                    </label>
                    <textarea
                      rows={8}
                      cols={30}
                      placeholder="sdder"
                      className="w-full mt-2 p-2 border border-gray-600 rounded bg-transparent dark:text-white text-black outline-none !h-min py-2"
                      value={item.description}
                      onChange={(e) => {
                        const updatedData = [...courseContentData];
                        updatedData[index].description = e.target.value;
                        setCourseContentData(updatedData);
                      }}
                    />
                  </div>

                  {item?.links.map((link, linkIndex) => (
                    <div className="mb-3 block" key={linkIndex}>
                      <div className="w-full flex items-center justify-between mb-1">
                        <label className="text-[16px] text-black dark:text-white font-Poppins">
                          Link {linkIndex + 1}
                        </label>
                        <AiOutlineDelete
                          className={`${
                            linkIndex === 0
                              ? "cursor-no-drop"
                              : "cursor-pointer"
                          } text-black dark:text-white text-[20px]`}
                          onClick={() =>
                            linkIndex === 0
                              ? null
                              : handleRemoveLink(index, linkIndex)
                          }
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Source Code... (Link title)"
                        className="w-full p-2 border border-gray-600 rounded bg-transparent dark:text-white text-black outline-none mb-2"
                        value={link.title}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].title =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Source Code Url... (Link URL)"
                        className="w-full p-2 border border-gray-600 rounded bg-transparent dark:text-white text-black outline-none"
                        value={link.url}
                        onChange={(e) => {
                          const updatedData = [...courseContentData];
                          updatedData[index].links[linkIndex].url =
                            e.target.value;
                          setCourseContentData(updatedData);
                        }}
                      />
                    </div>
                  ))}

                  <div className="inline-block my-4">
                    <p
                      className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                      onClick={() => handleAddLink(index)}
                    >
                      <BsLink45Deg className="mr-2" /> Add Link
                    </p>
                  </div>
                </>
              )}

              {index === courseContentData.length - 1 && (
                <div className="mt-4">
                  <p
                    className="flex items-center text-[18px] dark:text-white text-black cursor-pointer"
                    onClick={() => newContentHandler(item)}
                  >
                    <HiOutlinePlusCircle className="mr-2" /> Add New Content
                  </p>
                </div>
              )}
            </div>
          );
        })}

        <div
          className="flex items-center text-[20px] dark:text-white text-black cursor-pointer my-6"
          onClick={addNewSectionHandler}
        >
          <HiOutlinePlusCircle className="mr-2" /> Add new Section
        </div>
      </form>
      <div className="flex justify-between items-center pt-8 mt-10 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setActive && setActive(active - 1)}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-xl transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" /> Previous
        </button>

        <button
          type="button"
          onClick={() => setActive && setActive(active + 1)}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          Next <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CourseContent;
