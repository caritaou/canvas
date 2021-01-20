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
			{ attached_groups: "Kevins VM Groups", id: "a", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "b", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "c", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "d", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "e", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "f", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "g", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "h", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "i", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "j", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "k", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "l", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "m", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "n", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "o", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "p", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "q", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "r", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "s", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "t", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "u", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "v", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "w", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "x", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "y", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "z", name: "Load Balancer z" },
			{ attached_groups: "Kevins VM Groups", id: "a2", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "b2", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "c2", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "d2", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "e2", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "f2", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "g2", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "h2", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "i2", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "j2", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "k2", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "l2", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "m2", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "n2", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "o2", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "p2", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "q2", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "r2", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "s2", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "t2", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "u2", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "v2", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "w2", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "x2", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "y2", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "z2", name: "Load Balancer z2" },
			{ attached_groups: "Kevins VM Groups", id: "a3", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "b3", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "c3", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "d3", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "e3", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "f3", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "g3", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "h3", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "i3", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "j3", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "k3", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "l3", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "m3", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "n3", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "o3", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "p3", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "q3", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "r3", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "s3", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "t3", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "u3", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "v3", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "w3", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "x3", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "y3", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "z3", name: "Load Balancer z3" },
			{ attached_groups: "Kevins VM Groups", id: "a4", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "b4", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "c4", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "d4", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "e4", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "f4", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "g4", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "h4", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "i4", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "j4", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "k4", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "l4", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "m4", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "n4", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "o4", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "p4", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "q4", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "r4", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "s4", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "t4", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "u4", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "v4", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "w4", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "x4", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "y4", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "z4", name: "Load Balancer z4" },
			{ attached_groups: "Kevins VM Groups", id: "a5", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "b5", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "c5", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "d5", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "e5", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "f5", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "g5", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "h5", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "i5", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "j5", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "k5", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "l5", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "m5", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "n5", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "o5", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "p5", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "q5", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "r5", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "s5", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "t5", name: "Load Balancer 1" },
			{ attached_groups: "Andrews VM Groups", id: "u5", name: "Load Balancer 2" },
			{ attached_groups: "Marcs VM Groups", id: "v5", name: "Load Balancer 6" },
			{ attached_groups: "Mels VM Groups", id: "w5", name: "Load Balancer 4" },
			{ attached_groups: "Ronjas VM Groups", id: "x5", name: "Load Balancer 5" },
			{ attached_groups: "Kevins VM Groups", id: "y5", name: "Load Balancer 3" },
			{ attached_groups: "Maureens VM Groups", id: "z5", name: "Load Balancer z5" }
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
