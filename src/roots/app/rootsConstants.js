export const cardinalConstants = {
	NORTH: 0,
	NORTHEAST: 1,
	EAST: 2,
	SOUTHEAST: 3,
	SOUTH: 4,
	SOUTHWEST: 5,
	WEST: 6,
	NORTHWEST: 7,
	UP: 8,
	DOWN: 9,
	INSIDE: 10,
	OUTSIDE: 11
};

export const colorConstants = {
	mgiUnvisited: '#404040',
	mgiCurrent: '#364d63'
};

export const itemMetadataConstants = [
	{ //0: handwarmers
		name: 'handwarmers',
		display: 'Handwarmers',
		description: `Two cloth pouches that provide meager warmth. They don't last for long, but it's preferable to having extremities fall to frostbite.`,
		stackable: true,
		consumable: true,
    equipable: false
	}
];

export const modalModeConstants = {
	ITEM_INFO: 0,
	COMBAT: 1
};

export const regionConstants = {
	FOREST: 0,
	MANSION: 1,
	GRAVEYARD: 2
};

export const temperatureConstants = {
	GLACIAL: 0,
	FREEZING: 1,
	VERY_COLD: 2,
	COLD: 3,
	NORMAL: 4,
	WARM: 5,
	HOT: 6
};

export const visibilityConstants = {
	PITCH_BLACK: 0,
	VERY_DARK: 1,
	DARK: 2,
	DIM: 3,
	NORMAL: 4,
	LIT: 5
};
