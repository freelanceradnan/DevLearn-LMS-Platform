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
courseContentData[courseContentData?.length - 1]?.title === "" ||
courseContentData[courseContentData?.length - 1]?.videoUrl === "" ||
courseContentData[courseContentData?.length - 1]?.description === "" ||
courseContentData[courseContentData?.length - 1]?.links?.[0]?.title === "" ||
courseContentData[courseContentData?.length - 1]?.links?.[0]?.url === ""
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
   <div className="max-w-4xl m-auto p-4 sm:p-6 bg-slate-50 dark:bg-slate-900 min-h-screen rounded-2xl shadow-sm transition-colors duration-200">
  <form onSubmit={handleSubmit} className="space-y-6">
    {courseContentData?.map((item, index) => {
      const showSectionInput =
        index === 0 ||
        item.videoSection !== courseContentData[index - 1].videoSection;

      return (
        <div key={index} className="w-full">
          {/*  Header */}
          {showSectionInput && (
            <div className="flex items-center gap-3 mt-8 mb-4 pt-4 border-t border-slate-200 dark:border-slate-800 first:mt-0 first:pt-0 first:border-none">
              <div className="relative flex items-center group flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Section title"
                  className="w-full text-xl font-semibold font-Poppins text-slate-900 dark:text-slate-100 bg-transparent border-b-2 border-transparent hover:border-indigo-400 focus:border-indigo-600 outline-none px-1 py-0.5 transition-all"
                  value={item.videoSection}
                  onChange={(e) => {
                    const updatedData = [...courseContentData];
                    updatedData[index].videoSection = e.target.value;
                    setCourseContentData(updatedData);
                  }}
                />
                <BiSolidPencil className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors ml-2 pointer-events-none" />
              </div>
            </div>
          )}

          {/*  Card */}
          <div className="w-full bg-white dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all duration-200 p-5 mb-4">
            {/*  Header */}
            <div className="flex w-full items-center justify-between pb-2">
              <div className="flex-1 pr-4">
                {isCollapsed[index] ? (
                  item.title ? (
                    <p className="font-Poppins font-medium text-slate-800 dark:text-slate-200 truncate">
                      <span className="text-indigo-600 dark:text-indigo-400 font-semibold mr-2">
                        {index + 1}.
                      </span>
                      {item.title}
                    </p>
                  ) : (
                    <p className="font-Poppins text-slate-400 dark:text-slate-500 italic text-sm">
                      Untitled Content Block {index + 1}
                    </p>
                  )
                ) : (
                  <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                    Lesson {index + 1}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={index === 0}
                  className={`p-2 rounded-lg transition-colors ${
                    index === 0
                      ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                      : "text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                  }`}
                  onClick={() => {
                    if (index > 0) {
                      const updatedData = [...courseContentData];
                      updatedData.splice(index, 1);
                      setCourseContentData(updatedData);
                    }
                  }}
                >
                  <AiOutlineDelete className="text-lg" />
                </button>
                <button
                  type="button"
                  className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-colors cursor-pointer"
                  onClick={() => handleCollapseToggle(index)}
                >
                  <RxDragHandleDots2 className="text-lg" />
                </button>
              </div>
            </div>

            {/*  Form Body */}
            {!isCollapsed[index] && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-700/50 space-y-4">
                {/*  Title */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 font-Poppins mb-1.5 uppercase tracking-wide">
                    Video Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Project Setup & Architecture"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all"
                    value={item.title}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].title = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                </div>

                {/*  URL */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 font-Poppins mb-1.5 uppercase tracking-wide">
                    Video URL
                  </label>
                  <input
                    type="text"
                    placeholder="Enter videoCypher Video Code"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all"
                    value={item.videoUrl}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].videoUrl = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                </div>

                {/*  Description */}
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 font-Poppins mb-1.5 uppercase tracking-wide">
                    Video Description
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write a brief overview of this lesson..."
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 dark:focus:border-indigo-500 transition-all resize-y"
                    value={item.description}
                    onChange={(e) => {
                      const updatedData = [...courseContentData];
                      updatedData[index].description = e.target.value;
                      setCourseContentData(updatedData);
                    }}
                  />
                </div>

                {/* Resource Links Section */}
                <div className="pt-2">
                  <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 font-Poppins uppercase tracking-wide mb-3">
                    Attached Resources
                  </span>
                  <div className="space-y-3">
                    {item?.links?.map((link, linkIndex) => (
                      <div
                        key={linkIndex}
                        className="p-3 bg-slate-50 dark:bg-slate-900/60 rounded-lg border border-slate-200/80 dark:border-slate-700/40"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-medium text-indigo-600 dark:text-indigo-400 font-Poppins">
                            Resource Link #{linkIndex + 1}
                          </label>
                          <button
                            type="button"
                            disabled={linkIndex === 0}
                            className={`p-1 rounded transition-colors ${
                              linkIndex === 0
                                ? "text-slate-300 dark:text-slate-600 cursor-not-allowed"
                                : "text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 cursor-pointer"
                            }`}
                            onClick={() =>
                              linkIndex === 0
                                ? null
                                : handleRemoveLink(index, linkIndex)
                            }
                          >
                            <AiOutlineDelete className="text-base" />
                          </button>
                        </div>
                        <input
                          type="text"
                          placeholder="Link Title (e.g. GitHub Repository)"
                          className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 mb-2 transition-all"
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
                          placeholder="URL (e.g. https://github.com/...)"
                          className="w-full px-3 py-2 text-sm rounded-md border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-all"
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
                  </div>

                  {/* Add Link Button */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                    onClick={() => handleAddLink(index)}
                  >
                    <BsLink45Deg className="text-lg" /> Add Resource Link
                  </button>
                </div>
              </div>
            )}

            {/* Add Content Button (inside last card) */}
            {index === courseContentData.length - 1 && (
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors cursor-pointer"
                  onClick={() => newContentHandler(item)}
                >
                  <HiOutlinePlusCircle className="text-lg" /> Add Content Block
                </button>
              </div>
            )}
          </div>
        </div>
      );
    })}

    {/* Add Section Button */}
    <button
      type="button"
      className="w-full py-3 px-4 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-500 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-800/50 transition-all cursor-pointer"
      onClick={addNewSectionHandler}
    >
      <HiOutlinePlusCircle className="text-xl" /> Add New Section
    </button>
  </form>

  {/* Footer Navigation */}
  <div className="flex justify-between items-center pt-6 mt-8 border-t border-slate-200 dark:border-slate-800">
    <button
      type="button"
      onClick={() => setActive && setActive(active - 1)}
      className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-200/70 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-medium rounded-xl transition-all active:scale-95 cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" /> Previous
    </button>

    <button
      type="button"
      onClick={() => setActive && setActive(active + 1)}
      className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer"
    >
      Next <ArrowRight className="w-4 h-4" />
    </button>
  </div>
</div>
  );
};

export default CourseContent;
