/*
 * Copyright 2017-2020 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DataTable, Table, TableContainer, TableHead, TableHeader, TableRow, TableBody, TableCell } from "carbon-components-react";


import React from "react";

class NestedTable extends React.Component {

	render() {
		const sampleheaderData = [
			{
				header: "Name",
				key: "name",
			},
			{
				header: "Attached Groups",
				key: "attached_groups",
			}
		];

		const samplerowData = [
			{
				attached_groups: "Kevins VM Groups",
				id: "a",
				name: "Load Balancer 3"
			},
			{
				attached_groups: "Maureens VM Groups",
				id: "b",
				name: "Load Balancer 1"
			},
			{
				attached_groups: "Andrews VM Groups",
				id: "c",
				name: "Load Balancer 2"
			},
			{
				attached_groups: "Marcs VM Groups",
				id: "d",
				name: "Load Balancer 6"
			},
			{
				attached_groups: "Mels VM Groups",
				id: "e",
				name: "Load Balancer 4"
			},
			{
				attached_groups: "Ronjas VM Groups",
				id: "f",
				name: "Load Balancer 5"
			}
		];

		return (<DataTable rows={samplerowData} headers={sampleheaderData}>
			{({ rows, headers, getHeaderProps, getTableProps }) => (
				<TableContainer>
					<Table {...getTableProps()}>
						<TableHead>
							<TableRow>
								{headers.map((header) => (
									<TableHeader {...getHeaderProps({ header })}>
										{header.header}
									</TableHeader>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.map((row) => (
								<TableRow key={row.id}>
									{row.cells.map((cell) => (
										<TableCell key={cell.id}>{cell.value}</TableCell>
									))}
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			)}
		</DataTable>);
	}
}

NestedTable.propTypes = {};

export default NestedTable;
