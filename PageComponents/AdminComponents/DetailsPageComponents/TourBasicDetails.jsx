import React from 'react'

const TourBasicDetails = () => {
  return (
    <section className="p-4">
                            <h2 className="text-xl font-semibold mb-4">Basic Details</h2>
    
                            {/* Grid layout - responsive */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Title */}
                                <label className="flex flex-col">
                                    <span className="font-medium mb-1">Title*</span>
                                    <input
                                        type="text"
                                        value={basic.title}
                                        onChange={(e) => handleBasicChange("title", e.target.value)}
                                        placeholder="Package title"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                    />
                                </label>
    
                                {/* Duration */}
                                <label className="flex flex-col">
                                    <span className="font-medium mb-1">Duration (days)*</span>
                                    <input
                                        type="number"
                                        min={1}
                                        value={basic.durationDays}
                                        onChange={(e) => handleBasicChange("durationDays", e.target.value)}
                                        placeholder="e.g., 5"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                    />
                                </label>
    
                                {/* Description - full width */}
                                <label className="flex flex-col md:col-span-2">
                                    <span className="font-medium mb-1">Description*</span>
                                    <textarea
                                        rows={4}
                                        value={basic.description}
                                        onChange={(e) => handleBasicChange("description", e.target.value)}
                                        placeholder="Describe the package"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                    />
                                </label>
    
                                {/* Thumbnail */}
                                <label className="flex flex-col md:col-span-2">
                                    {basic.thumbnailPreview && (
                                        <div className="mt-2">
                                            <Image
                                                fill
                                                src={basic.thumbnailPreview}
                                                alt="thumbnail preview"
                                                className="max-w-[200px] rounded-lg shadow"
                                            />
                                        </div>
                                    )}
                                    <span className="font-medium mb-1">Thumbnail Image*</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleBasicImage(e.target.files?.[0])}
                                        className="border border-gray-300 rounded-lg"
                                    />
                                </label>
    
                                {/* Pickup Location */}
                                <label className="flex flex-col">
                                    <span className="font-medium mb-1">Pickup Location(s)* (comma-separated)</span>
                                    <input
                                        type="text"
                                        value={basic.pickupLocation}
                                        onChange={(e) => handleBasicChange("pickupLocation", e.target.value)}
                                        placeholder="City/Address"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                    />
                                </label>
    
                                {/* Drop Location */}
                                <label className="flex flex-col">
                                    <span className="font-medium mb-1">Drop Location(s)* (comma-separated)</span>
                                    <input
                                        type="text"
                                        value={basic.dropLocation}
                                        onChange={(e) => handleBasicChange("dropLocation", e.target.value)}
                                        placeholder="City/Address"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                    />
                                </label>
    
                                {/* Destination Name */}
                                <label className="flex flex-col">
                                    <span className="font-medium mb-1">Destination Name*</span>
                                    <input
                                        type="text"
                                        value={basic.destinationName}
                                        onChange={(e) => handleBasicChange("destinationName", e.target.value)}
                                        placeholder="e.g., Manali"
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                    />
                                </label>
    
                                {/* Destination State */}
                                <label className="flex flex-col">
                                    <span className="font-medium mb-1">Destination State*</span>
                                    <CreatableSelect
                                        options={states.map((s) => ({ value: s, label: s }))}
                                        value={
                                            basic.destinationState
                                                ? { value: basic.destinationState, label: basic.destinationState }
                                                : null
                                        }
                                        onChange={(selectedOption) =>
                                            handleBasicChange(
                                                "destinationState",
                                                selectedOption ? selectedOption.value : ""
                                            )
                                        }
                                        placeholder="Type or pick a state"
                                        isClearable
                                    />
                                </label>
                            </div>
    
                            {/* Note - full row */}
                            <div className="mt-6">
                                <label className="flex flex-col">
                                    <span className="font-medium mb-1">Note (optional)</span>
                                    <textarea
                                        rows={3}
                                        value={basic.note}
                                        onChange={(e) => handleBasicChange("note", e.target.value)}
                                        placeholder="Add any additional notes here..."
                                        className="w-full border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                    />
                                </label>
                            </div>
    
                            {/* Inclusions */}
                            <div style={{ marginTop: "2vh" }} className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">Inclusions</h3>
                                {basic.inclusions.map((inc, i) => (
                                    <div
                                        key={`inc-${i}`}
                                        className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3"
                                    >
                                        {/* Type dropdown */}
                                        <select
                                            value={inc.type || ""}
                                            onChange={(e) =>
                                                handleInclusionChange(i, "type", e.target.value)
                                            }
                                            className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                        >
                                            <option value="">Select type</option>
                                            <option value="INCLUDED">INCLUDED</option>
                                            <option value="EXCLUDED">EXCLUDED</option>
                                        </select>
    
                                        {/* Description */}
                                        <input
                                            type="text"
                                            value={inc.description || ""}
                                            onChange={(e) =>
                                                handleInclusionChange(i, "description", e.target.value)
                                            }
                                            placeholder="Description"
                                            className="border border-gray-300 rounded-lg p-2 focus:ring focus:ring-blue-300"
                                        />
    
                                        {/* Remove button (full width on small, right aligned on md) */}
                                        <div className="md:col-span-2 flex justify-end">
                                            <button
                                                type="button"
                                                onClick={() => removeInclusion(i)}
                                                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 mt-2"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                <button
                                    type="button"
                                    onClick={addInclusion}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                >
                                    Add more
                                </button>
                            </div>
    
                            {/* Navigation Buttons */}
                            <div style={{ marginTop: "2vh" }} className="flex gap-4 mt-8">
                                <button
                                    type="button"
                                    disabled={!basicValid}
                                    // onClick={()=>console.log(basic)}
                                    onClick={handleSubmit}
                                    title={!basicValid ? "Fill all required fields" : ""}
                                    className={`px-4 py-2 rounded-lg text-white transition bg-green-500 hover:bg-green-600`}
                                >
                                    Submit
                                </button>
                            </div>
                        </section>
  )
}

export default TourBasicDetails