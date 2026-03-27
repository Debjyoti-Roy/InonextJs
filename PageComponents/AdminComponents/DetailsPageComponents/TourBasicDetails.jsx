import { getStates } from '@/Redux/store/adminCarSlice';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CreatableSelect from 'react-select/creatable'
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { updateTourPackage } from '@/Redux/store/adminTourSlice';
import toast from 'react-hot-toast';

const TourBasicDetails = ({ tourDetails, basicClose }) => {
    const storage = getStorage();
    const [submitting, setSubmitting] = useState(false)
    const [basic, setBasic] = useState({
        title: "",
        durationDays: 1,
        description: "",
        thumbnailPreview: "",
        pickupLocation: "",
        dropLocation: "",
        destinationName: "",
        destinationState: "",
        note: "",
        inclusions: [],
    });
    const [thumb] = useState(tourDetails.thumbnailUrl)
    const dispatch = useDispatch();
    const { states = [] } = useSelector((state) => state.admincar);
    useEffect(() => {
        dispatch(getStates());
    }, [dispatch]);
    useEffect(() => {
        console.log(tourDetails)
    }, [tourDetails])

    useEffect(() => {
        if (tourDetails) {
            setBasic({
                title: tourDetails.title || "",
                durationDays: tourDetails.durationDays || 1,
                description: tourDetails.description || "",
                thumbnailPreview: tourDetails.thumbnailUrl || "",
                pickupLocation: tourDetails.pickupLocation || "",
                dropLocation: tourDetails.dropLocation || "",
                destinationName: tourDetails.destination?.name || "",
                destinationState: tourDetails.destination?.state || "",
                note: tourDetails.note || "",

                inclusions: [
                    ...(tourDetails.included || []).map((item) => ({
                        type: "INCLUDED",
                        description: item,
                    })),
                    ...(tourDetails.excluded || []).map((item) => ({
                        type: "EXCLUDED",
                        description: item,
                    })),
                ],
            });
        }
    }, [tourDetails]);

    const handleBasicChange = (key, value) => {
        setBasic((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleBasicImage = (file) => {
        if (!file) return;

        const preview = URL.createObjectURL(file);

        setBasic((prev) => ({
            ...prev,
            thumbnailPreview: preview,
            thumbnailFile: file, // optional
        }));
    };

    const handleInclusionChange = (index, key, value) => {
        const updated = [...basic.inclusions];
        updated[index][key] = value;

        setBasic((prev) => ({
            ...prev,
            inclusions: updated,
        }));
    };

    const addInclusion = () => {
        setBasic((prev) => ({
            ...prev,
            inclusions: [...prev.inclusions, { type: "", description: "" }],
        }));
    };

    const removeInclusion = (index) => {
        const updated = basic.inclusions.filter((_, i) => i !== index);

        setBasic((prev) => ({
            ...prev,
            inclusions: updated,
        }));
    };

    const basicValid =
        basic.title &&
        basic.durationDays &&
        basic.description &&
        basic.pickupLocation &&
        basic.dropLocation &&
        basic.destinationName &&
        basic.destinationState;

    const uploadFileMock = async (file, title) => {
        try {
            // Create a storage reference
            const fileRef = ref(storage, `tour-package/${title}/${file.name}`);

            // Upload the file
            await uploadBytes(fileRef, file);

            // Get the download URL
            const url = await getDownloadURL(fileRef);

            return url; // <-- return the Firebase file link
        } catch (error) {
            console.error("File upload failed:", error);
            throw error;
        }
    };
    const deleteFiles = async (paths) => {
        try {
            await deleteObject(ref(storage, paths));
        } catch (err) {
            console.warn("Failed to delete file:", paths, err);
        }
    };

    const handleSubmit = async () => {
    setSubmitting(true);
    let url = thumb;
    let newUploadUrl = null;

    try {
        // 1. Handle File Upload
        if (basic.thumbnailPreview !== thumb) {
            console.log("IMAGE CHANGED");
            // Assuming uploadFileMock is an async function
            newUploadUrl = await uploadFileMock(basic.thumbnailFile, basic.title.trim());
            url = newUploadUrl;
        }

        const data = {
            ...basic,
            packageId: tourDetails.id,
            thumbnailUrl: url
        };

        // 2. Update Tour Package
        // Use unwrap() to catch errors in the catch block
        await dispatch(updateTourPackage({ formData: data })).unwrap();
        
        // 3. Success Actions
        toast.success("Basic details updated successfully");

        // Try to delete old files, but don't let a failure here 
        // trigger the "Update Failed" error toast
        try {
            if (newUploadUrl && thumb) {
                await deleteFiles(thumb);
            }
        } catch (e) {
            console.error("Cleanup failed, but data was saved:", e);
        }

        basicClose();
    } catch (err) {
        // 4. Error Actions
        toast.error("Failed to update basic details");
        
        // If the API failed, cleanup the newly uploaded file
        if (newUploadUrl) {
            await deleteFiles(newUploadUrl);
        }
    } finally {
        setSubmitting(false);
    }
};

    // const handleSubmit = () => {
    //     // console.log("FINAL:", basic);
    //     let url;
    //     let url2 = null;
    //     if (basic.thumbnailPreview !== thumb) {
    //         console.log("IMAGE CHANGED")
    //         // deleteFiles(thumb)
    //         url = uploadFileMock(basic.thumbnailFile, basic.title.trim())
    //         url2 = uploadFileMock(basic.thumbnailFile, basic.title.trim())
    //     } else {
    //         url = thumb
    //     }
    //     const data = {
    //         ...basic,
    //         packageId: tourDetails.id,
    //         thumbnailUrl: url
    //     }
    //     console.log(data)
    //     dispatch(updateTourPackage({ formData: data }))
    //         .unwrap()
    //         .then(async(res) => {
    //             setSubmitting(false);
    //             toast.success("Basic details updated successfully")
    //             await deleteFiles(thumb)
    //             basicClose()
    //         })
    //         .catch(async (err) => {
    //             setSubmitting(false)
    //             toast.error("Failed to update basic details");
    //             if (url2 !== null) {
    //                 await deleteFiles(url2)
    //             }
    //             basicClose()
    //         })

    // };
//     const handleSubmit = async () => {
//     try {
//         let url;
//         let url2 = null;

//         if (basic.thumbnailPreview !== thumb) {
//             url = uploadFileMock(basic.thumbnailFile, basic.title.trim());
//             url2 = uploadFileMock(basic.thumbnailFile, basic.title.trim());
//         } else {
//             url = thumb;
//         }

//         const data = {
//             ...basic,
//             packageId: tourDetails.id,
//             thumbnailUrl: url
//         };

//         const res = await dispatch(updateTourPackage({ formData: data })).unwrap();

//         if (!res || res.error || res.success === false) {
//             throw new Error("API failed");
//         }

//         toast.success("Basic details updated successfully");
//         await deleteFiles(thumb);
//         basicClose();

//     } catch (err) {
//         toast.error("Failed to update basic details");

//         if (url2 !== null) {
//             await deleteFiles(url2);
//         }

//         basicClose();
//     } finally {
//         setSubmitting(false);
//     }
// };

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
                        <div className="mt-2 relative w-[200px] h-[120px]">
                            {/* <Image
                                fill
                                src={basic.thumbnailPreview}
                                alt="thumbnail preview"
                                className="rounded-lg shadow object-cover"
                            /> */}
                            <Image
                                key={basic.thumbnailPreview}   // ✅ IMPORTANT FIX
                                fill
                                src={basic.thumbnailPreview}
                                alt="thumbnail preview"
                                className="rounded-lg shadow object-cover"
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
                    className={`px-4 py-2 rounded-lg text-white transition ${submitting
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-600"
                        }`}
                >
                    {submitting ? "Submitting..." : "Submit Changes"}
                </button>
            </div>
        </section>
    )
}

export default TourBasicDetails