import IGameCell from "./IGameCell";

export default interface IGameAI {
	move: () => void;
	getRandomEmptyCell: () => IGameCell | boolean;
}

type SequenceStateMetaData = {
	suggestToHold: boolean;
	hasAiIn?: boolean;
	hasPlayerIn?: boolean;
	movesAIToWin?: number;
	movesPlayerToWin?: number;
};
type SequinceState = {
	metaData?: SequenceStateMetaData;
	seq?: {
		seqAiCells?: IGameCell[];
		seqEmptyCells?: IGameCell[];
		seqPlayerCells?: IGameCell[];
	};
};
type Disposition = {
	rowsState: SequinceState[];
	columnsState: SequinceState[];
	diagonalsState: SequinceState[];
};

type BestPlayersMoveData = {
	bestStepsCountToWinAI: number;
	bestSeqForAI: IGameCell[];
	bestStepsCountToWinPlayer: number;
	bestSeqForPlayer: IGameCell[];
};
export type {
	Disposition,
	SequinceState,
	SequenceStateMetaData,
	BestPlayersMoveData,
};
