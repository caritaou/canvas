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
/* eslint arrow-body-style: ["off"] */

import nodes from "./nodes.js";
import comments from "./comments.js";
import links from "./links.js";

export default (state = {}, action) => {
	switch (action.type) {

	case "SET_CANVAS_INFO": {
		if (action.canvasInfo) {
			return action.canvasInfo;
		}
		return state;
	}

	// Save incoming sub-pipeline to the pipeline flow pipelines array.
	case "ADD_PIPELINE": {
		return Object.assign({}, state, { pipelines: state.pipelines.concat(action.data) });
	}

	// Add pipelines from the external pipeline flow into the canvas info pipelines array
	case "ADD_EXTERNAL_PIPELINE_FLOW": {
		return Object.assign({}, state, { pipelines: state.pipelines.concat(action.newPipelines) });
	}

	case "REMOVE_EXTERNAL_PIPELINE_FLOW": {
		const canvasInfoPipelines = state.pipelines.filter((pipeline) => {
			if (pipeline.parentUrl) {
				return pipeline.parentUrl !== action.externalUrl;
			}
			return true;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}

	case "CONVERT_SN_EXTERNAL_TO_LOCAL": {
		let canvasInfoPipelines = state.pipelines.map((pipeline) => {
			// We need to alter the supernode so its subflow_ref.url field is removed.
			// The supernode is identified by the supernodeParentPipelineId and the
			// supernodeId passed in.
			if (pipeline.id === action.data.supernodeParentPipelineId) {
				return Object.assign({}, pipeline, {
					nodes: nodes(pipeline.nodes, action) });
			}
			// If the pipeline is loaded, we need to remove the parentUrl field from
			// the pipeline which is the sub-flow for the supernode being converted
			// to local. This will be a different pipeline to the one where the
			// supernode exists.
			if (pipeline.parentUrl === action.data.externalFlowUrl) {
				const p = Object.assign({}, pipeline);
				delete p.parentUrl;
				return p;
			}

			return pipeline;
		});

		// If the pipeline is not loaded we will be provided by one (or more new
		// pipelines so we add them to the canvas info's pipelines.
		// referencd by its supernodes.
		if (action.data.newPipelines) {
			canvasInfoPipelines = canvasInfoPipelines.concat(action.data.newPipelines);
		}

		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}

	case "CONVERT_SN_LOCAL_TO_EXTERNAL": {
		const canvasInfoPipelines = state.pipelines.map((pipeline) => {
			// We need to alter the supernode so a subflow_ref.url field is added.
			// The supernode is identified by the supernodePipelineId and the
			// supernodeId passed in.
			if (pipeline.id === action.data.supernodePipelineId) {
				return Object.assign({}, pipeline, {
					nodes: nodes(pipeline.nodes, action) });
			}

			// We need to add the parntUrl property to the subflow pipeline that
			// is being made external.
			if (pipeline.id === action.data.subflowPipelineId) {
				return Object.assign({}, pipeline, { parentUrl: action.data.externalFlowUrl });
			}
			return pipeline;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}

	// Delete a pipeline from the pipeline flow pipelines array.
	case "DELETE_PIPELINE": {
		const canvasInfoPipelines = state.pipelines.filter((pipeline) => {
			return pipeline.id !== action.data.id;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}

	case "SET_PIPELINE_ZOOM": {
		const canvasInfoPipelines = state.pipelines.map((pipeline) => {
			if (pipeline.id === action.pipelineId) {
				return Object.assign({}, pipeline, { zoom: { "k": action.data.zoom.k, "x": action.data.zoom.x, "y": action.data.zoom.y } });
			}
			return pipeline;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}

	case "SET_LAYOUT_INFO": {
		return Object.assign({}, state, { pipelines: action.pipelines });
	}

	case "DELETE_SUPERNODE": {
		// Delete the supernode pipelines.
		let canvasInfoPipelines = state.pipelines;
		action.data.pipelineIds.forEach((pipelineId) => {
			canvasInfoPipelines = canvasInfoPipelines.filter((pipeline) => {
				return pipeline.id !== pipelineId;
			});
		});

		// Delete the supernode.
		canvasInfoPipelines = canvasInfoPipelines.map((pipeline) => {
			if (pipeline.id === action.pipelineId) {
				return Object.assign({}, pipeline, {
					nodes: nodes(pipeline.nodes, action),
					links: links(pipeline.links, action)
				});
			}
			return pipeline;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}

	case "SET_SUBDUE_STYLE":
		return Object.assign({}, state, { subdueStyle: action.data.subdueStyle });

	case "ADD_NODE":
	case "ADD_AUTO_NODE":
	case "REPLACE_NODES":
	case "REPLACE_NODE":
	case "SIZE_AND_POSITION_OBJECTS":
	case "SET_NODE_PROPERTIES":
	case "SET_NODE_PARAMETERS":
	case "SET_NODE_UI_PARAMETERS":
	case "SET_NODE_MESSAGE":
	case "SET_NODE_MESSAGES":
	case "SET_NODE_DECORATIONS":
	case "SET_LINK_DECORATIONS":
	case "ADD_NODE_ATTR":
	case "REMOVE_NODE_ATTR":
	case "SET_NODE_LABEL":
	case "SET_OBJECTS_CLASS_NAME":
	case "SET_INPUT_PORT_LABEL":
	case "SET_OUTPUT_PORT_LABEL":
	case "SET_INPUT_PORT_SUBFLOW_NODE_REF":
	case "SET_OUTPUT_PORT_SUBFLOW_NODE_REF":
	case "SET_SUPERNODE_FLAG":
	case "MOVE_OBJECTS":
	case "DELETE_OBJECT":
	case "ADD_LINK":
	case "SET_LINK_PROPERTIES":
	case "SET_LINK_SRC_INFO":
	case "SET_LINK_TRG_INFO":
	case "SET_LINKS_CLASS_NAME":
	case "DELETE_LINK":
	case "DELETE_LINKS":
	case "UPDATE_LINK":
	case "ADD_COMMENT":
	case "EDIT_COMMENT":
	case "SET_COMMENT_PROPERTIES":
	case "ADD_COMMENT_ATTR":
	case "REMOVE_COMMENT_ATTR": {
		const canvasInfoPipelines = state.pipelines.map((pipeline) => {
			if (pipeline.id === action.pipelineId) {
				return Object.assign({}, pipeline, {
					nodes: nodes(pipeline.nodes, action),
					comments: comments(pipeline.comments, action),
					links: links(pipeline.links, action) });
			}
			return pipeline;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}
	case "SET_OBJECTS_STYLE":
	case "SET_LINKS_STYLE": {
		const pipelineIds = Object.keys(action.data.pipelineObjIds);
		const canvasInfoPipelines = state.pipelines.map((pipeline) => {
			if (pipelineIds.indexOf(pipeline.id) > -1) {
				action.data.objIds = action.data.pipelineObjIds[pipeline.id];
				action.data.pipelineId = pipeline.id;
				return Object.assign({}, pipeline, {
					nodes: nodes(pipeline.nodes, action),
					comments: comments(pipeline.comments, action),
					links: links(pipeline.links, action) });
			}
			return pipeline;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}
	case "SET_OBJECTS_MULTI_STYLE":
	case "SET_LINKS_MULTI_STYLE": {
		const canvasInfoPipelines = state.pipelines.map((pipeline) => {
			if (action.data.pipelineObjStyles.findIndex((entry) => entry.pipelineId === pipeline.id) > -1) {
				action.data.pipelineId = pipeline.id;
				return Object.assign({}, pipeline, {
					nodes: nodes(pipeline.nodes, action),
					comments: comments(pipeline.comments, action),
					links: links(pipeline.links, action) });
			}
			return pipeline;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });

	}
	case "SET_NODES_MULTI_DECORATIONS": {
		const canvasInfoPipelines = state.pipelines.map((pipeline) => {
			if (action.data.pipelineNodeDecorations.findIndex((entry) => entry.pipelineId === pipeline.id) > -1) {
				action.data.pipelineId = pipeline.id;
				return Object.assign({}, pipeline, {
					nodes: nodes(pipeline.nodes, action),
					comments: pipeline.comments,
					links: pipeline.links });
			}
			return pipeline;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });

	}
	case "SET_LINKS_MULTI_DECORATIONS": {
		const canvasInfoPipelines = state.pipelines.map((pipeline) => {
			if (action.data.pipelineLinkDecorations.findIndex((entry) => entry.pipelineId === pipeline.id) > -1) {
				action.data.pipelineId = pipeline.id;
				return Object.assign({}, pipeline, {
					nodes: pipeline.nodes,
					comments: pipeline.comments,
					links: links(pipeline.links, action) });
			}
			return pipeline;
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });

	}
	case "REMOVE_ALL_STYLES": {
		const canvasInfoPipelines = state.pipelines.map((pipeline) => {
			return Object.assign({}, pipeline, {
				nodes: nodes(pipeline.nodes, action),
				comments: comments(pipeline.comments, action),
				links: links(pipeline.links, action) });
		});
		return Object.assign({}, state, { pipelines: canvasInfoPipelines });
	}
	default:
		return state;
	}
};
