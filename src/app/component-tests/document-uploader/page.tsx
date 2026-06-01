"use client";

import { useState } from "react";

import {
	DEFAULT_ACCEPTED_FILE_TYPES,
	DEFAULT_MAX_DOCUMENTS,
	DEFAULT_MAX_FILE_SIZE_MB,
	DocumentUploader,
} from "@/components/verification/document-uploader";

function formatFileNames(files: File[]) {
	if (files.length === 0) {
		return "No files selected";
	}

	return files.map((file) => file.name).join(", ");
}

export default function DocumentUploaderTestPage() {
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [submittedFiles, setSubmittedFiles] = useState<File[]>([]);

	return (
		<main className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-4xl">
				<div className="mb-8">
					<p className="text-sm font-medium text-[#605DEC]">Component test</p>
					<h1 className="mt-2 text-3xl font-bold">Document Uploader</h1>
					<p className="mt-2 max-w-2xl text-sm text-gray-600">
						Upload PDFs or images to inspect file previews, remove actions, and
						validation for type, size, and max document count.
					</p>
				</div>

				<div className="grid gap-5 lg:grid-cols-[1fr_20rem]">
					<section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
						<DocumentUploader
							onFilesChange={setSelectedFiles}
							onSubmit={(files) => {
								setSubmittedFiles(files);
							}}
						/>
					</section>

					<aside className="space-y-5">
						<section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
							<h2 className="text-lg font-semibold">Constraints</h2>
							<dl className="mt-4 space-y-3 text-sm">
								<div>
									<dt className="font-medium text-gray-900">Max documents</dt>
									<dd className="mt-1 text-gray-600">{DEFAULT_MAX_DOCUMENTS}</dd>
								</div>
								<div>
									<dt className="font-medium text-gray-900">Max file size</dt>
									<dd className="mt-1 text-gray-600">
										{DEFAULT_MAX_FILE_SIZE_MB} MB
									</dd>
								</div>
								<div>
									<dt className="font-medium text-gray-900">Accepted MIME types</dt>
									<dd className="mt-1 break-words text-gray-600">
										{DEFAULT_ACCEPTED_FILE_TYPES.join(", ")}
									</dd>
								</div>
							</dl>
						</section>

						<section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
							<h2 className="text-lg font-semibold">Live State</h2>
							<div className="mt-4 space-y-4 text-sm">
								<div>
									<p className="font-medium text-gray-900">
										Selected files ({selectedFiles.length})
									</p>
									<p className="mt-1 break-words text-gray-600">
										{formatFileNames(selectedFiles)}
									</p>
								</div>
								<div>
									<p className="font-medium text-gray-900">
										Last submitted ({submittedFiles.length})
									</p>
									<p className="mt-1 break-words text-gray-600">
										{formatFileNames(submittedFiles)}
									</p>
								</div>
							</div>
						</section>
					</aside>
				</div>
			</div>
		</main>
	);
}
