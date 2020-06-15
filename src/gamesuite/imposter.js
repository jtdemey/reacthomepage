export const rollScenario = () => {
  const scenarios = [
    {
      title: 'Animal Hospital',
      roles: [
        'Veterinarian',
        'Anesthesiologist',
        'Janitor',
        'Surgeon',
        'Front Desk Secretary',
        'Biologist',
        'Medical Intern',
        'Medical Engineer',
        'Pharmacologist',
        'Nurse'
      ]
    },
    {
      title: 'Bank Robbery',
      roles: [
        'Mastermind',
        'Demolitionist',
        'Getaway Driver',
        'Weapon Specialist',
        'Technology Specialist',
        'Vault-driller',
        'The Distraction',
        'Recon Specialist',
        'Hostage Taker',
        'Money Bagger'
      ]
    },
    {
      title: 'CIA Headquarters',
      roles: [
        'Mastermind',
        'Demolitionist',
        'Getaway Driver',
        'Weapon Specialist',
        'Technology Specialist',
        'Vault-driller',
        'The Distraction',
        'Recon Specialist',
        'Hostage Taker',
        'Money Bagger'
      ]
    },
    {
      title: 'Diamond Mine',
      roles: [
        'Mine Administrator',
        'Geologist',
        'Elevator Specialist',
        'Surveyor',
        'Miner',
        'Miner',
        'Miner',
        'Geologist',
        'Geologist',
        'Miner'
      ]
    },
    {
      title: 'Jungle Safari',
      roles: [
        'Expeditionist',
        'Biologist',
        'Survivalist',
        'Botanist',
        'Hunter',
        'Journalist',
        'Explorer',
        'Translator',
        'Biologist',
        'Photographer'
      ]
    },
    {
      title: 'Polar Expedition',
      roles: [
        'Head Researcher',
        'Assistant Researcher',
        'Meteorologist',
        'Surveyor',
        'Biologist',
        'Journalist',
        'Explorer',
        'Researcher',
        'Survivalist',
        'Photographer'
      ]
    },
    {
      title: 'Rich House Party',
      roles: [
        'Governor',
        'Aristocrat',
        'Snob',
        'Entrepreneur',
        'Duke',
        'Duchess',
        'The Monopoly Guy',
        'Overseer',
        'Senator',
        'Baron'
      ]
    },
    {
      title: 'Forest Hobo Camp',
      roles: [
        'Hobo King',
        'Drifter',
        'Beggar',
        'Hippie',
        'Hobo',
        'Drifter',
        'Beggar',
        'Hobo',
        'Hobo',
        'Hobo'
      ]
    },
    {
      title: 'Bandit Camp',
      roles: [
        'Interrogator',
        'Executioner',
        'Captain',
        'Demolitionist',
        'Mercenary',
        'Thief',
        'Bruiser',
        'Prisoner of War',
        'Captured Journalist',
        'Deserter'
      ]
    },
    {
      title: 'Art Museum',
      roles: [
        'Art Snob',
        'Artist',
        'Art Admirer',
        'Security Guard',
        'Curator',
        'Art Critic',
        'Art Collector',
        'Tourist',
        'Art Enthusiast',
        'Artist'
      ]
    },
    {
      title: 'Movie Set',
      roles: [
        'Director',
        'Actor',
        'Producer',
        'Makeup Artist',
        'Costume Designer',
        'Cameraman',
        'The Celebrity Cameo',
        'Boom Operator',
        'Intern',
        'Stunt Double'
      ]
    },
    {
      title: 'Psychiatric Hospital',
      roles: [
        'Doctor',
        'Nurse',
        'Nurse',
        'Schizophrenic',
        'Patient',
        'Criminal',
        'Psychiatrist',
        'Guard',
        'Guard',
        'Patient'
      ]
    },
    {
      title: 'Construction Site',
      roles: [
        'Foreman',
        'Laborer',
        'Operator',
        'Inspector',
        'Superintendent',
        'Laborer',
        'Operator',
        'Laborer',
        'Foreman',
        'Laborer'
      ]
    },
    {
      title: 'High Security Prison',
      roles: [
        'Serial killer',
        'Guard',
        'Guard',
        'Robber',
        'Jewel thief',
        'Laborer',
        'Overseer',
        'Cook',
        'Contraband trader',
        'Hustler'
      ]
    },
    {
      title: 'College Lecture Hall',
      roles: [
        'Professor',
        'Student',
        'Student',
        'Student',
        'Delinquent',
        'Sleepy student',
        'Slacker',
        'Gamer',
        'Weeb',
        `Teacher's pet`
      ]
    },
    {
      title: 'Public Hanging',
      roles: [
        'Executioner',
        'Accused',
        'Accuser',
        'Jeering peasant',
        'Town crier',
        'Priest',
        'King',
        'Queen',
        'Jester',
        'Knight'
      ]
    },
    {
      title: 'Medical Dispensary',
      roles: [
        'Bud tender',
        'Old person',
        'Stoner',
        'Stoner',
        'Employee',
        'Patient',
        'Patient',
        'Marijuana enthusiast',
        'Patient',
        'Cashier'
      ]
    },
    {
      title: 'Open Heart Surgery',
      roles: [
        'Surgeon',
        'Nurse',
        'Surgeon',
        'Anesthesiologist',
        'Medical student',
        'Medical student',
        'Nurse',
        'Surgical tech',
        'Medical aid',
        'Physician assistant'
      ]
    },
    {
      title: 'Fight Club',
      roles: [
        'Director',
        'Brawler',
        'Kickboxer',
        'Worker',
        'Bouncer',
        'Boxer',
        'Martial artist',
        'Veteran',
        'Fighter',
        'Fighter'
      ]
    },
    {
      title: 'Rock Concert',
      roles: [
        'Guitarist',
        'Drummer',
        'Bassist',
        'Singer',
        'Lighting tech',
        'Audio tech',
        'Band manager',
        'Fan',
        'Mosher',
        'Raving fan'
      ]
    },
    {
      title: 'Baptist Church',
      roles: [
        'Preacher',
        'Old lady',
        'Old man',
        'Avid Christian',
        'Acolyte',
        'Choir singer',
        'Choir director',
        'Organist',
        'Usher',
        'Bored kid'
      ]
    },
  ];
  const conditions = [
    `Everyone's injured`,
    `Everyone's old`,
    `Everyone has an indiscernable accent`,
    `Everyone's sick`,
    `It's way too hot`,
    `It's way too cold`,
    `You forgot to do something important`,
    `It smells like shit`,
    `You're nearly deaf`,
    `Everyone's tripping balls`,
    `There's a persistent, annoying humming sound`,
    `There's a roach infestation`
  ];
  const scenarioRes = scenarios[Math.floor(Math.random() * scenarios.length)];
  const conditionRes = conditions[Math.floor(Math.random() * conditions.length)];
  const scenarioList = scenarios.map(s => s.title);
  return {
    scenario: scenarioRes.title,
    scenarioList,
    condition: conditionRes,
    roles: scenarioRes.roles
  };
};