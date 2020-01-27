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
      title: 'ISIS Camp',
      roles: [
        'Interrogator',
        'Executioner',
        'Captain',
        'Demolitionist',
        'Mercenary',
        'Terrorist',
        'Jihadist',
        'Prisoner of War',
        'Captured Journalist',
        'Soldier'
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
    }
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
    `You're nearly deaf`
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