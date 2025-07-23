import React, { useState } from 'react';

const FlagConfirmationModal = ({ isOpen, onConfirm, onCancel, itemId, inputError, setComment, comment }) => {
  if (!isOpen) return null;


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white dark:bg-boxdark p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirm Flag Playlog</h2>
        <p>
          You are about to flag this log for dispute. Are you sure you want to
          take this action?
        </p>
        <div>
          <label
            htmlFor="title"
            className="block text-white text-sm font-bold mb-2 mt-5"
          >
            Comment <span className="text-red-500">*</span>
          </label>

          {inputError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-3">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {inputError}</span>
          </div>
        )}

          <textarea
            placeholder="Describe your issue..."
            rows="4"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
            className="w-full bg-slate-800 text-white p-3 rounded-md border border-white/10"
          />
        </div>
        <div className="mt-4 flex justify-end space-x-4">
          <button
            onClick={() => onConfirm(itemId)}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Flag
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlagConfirmationModal;
