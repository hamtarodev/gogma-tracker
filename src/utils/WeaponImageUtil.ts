const bow = '/weapons/Bow/Bow_Rank_01.svg'
const chargeBlade = '/weapons/Charge_Blade/Charge_Blade_rank_01.svg'
const dualBlades = '/weapons/Dual_Blades/Dual_Blades_Rank_01.svg'
const greatSword = '/weapons/Great_Sword/Great_Sword_Rank_01.svg'
const gunLance = '/weapons/Gunlance/Gunlance_Rank_01.svg'
const hammer = '/weapons/Hammer/Hammer_Rank_01.svg'
const heavyBowGun = '/weapons/Heavy_Bowgun/Heavy_Bowgun_Rank_01.svg'
const huntingHorn = '/weapons/Hunting_Horn/Hunting_Horn_Rank_01.svg'
const insectGlaive = '/weapons/Insect_Glaive/Insect_Glaive_Rank_01.svg'
const lance = '/weapons/Lance/Lance_Rank_01.svg'
const lightBowGun = '/weapons/Light_Bowgun/Light_Bowgun_Rank_01.svg'
const longSword = '/weapons/Long_Sword/Long_Sword_Rank_01.svg'
const swordAndShield = '/weapons/Sword_and_Shield/Sword_&_Shield_Rank_01.svg'
const switchAxe = '/weapons/Switch_Axe/Switch_Axe_Rank_01.svg'

export const getWeaponIcons = (weaponName: string) => {
  switch (weaponName) {
    case 'sword_and_shield':
      return swordAndShield
    case 'long_sword':
      return longSword
    case 'bow':
      return bow
    case 'lance':
      return lance
    case 'gun_lance':
      return gunLance
    case 'great_sword':
      return greatSword
    case 'light_bow_gun':
      return lightBowGun
    case 'heavy_bow_gun':
      return heavyBowGun
    case 'switch_axe':
      return switchAxe
    case 'charge_blade':
      return chargeBlade
    case 'insect_glaive':
      return insectGlaive
    case 'hammer':
      return hammer
    case 'dual_blades':
      return dualBlades
    case 'hunting_horn':
      return huntingHorn
    default:
      return ""
  }
}