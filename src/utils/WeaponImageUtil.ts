const base = import.meta.env.BASE_URL

const bow = `${base}weapons/Bow/Bow_Rank_01.svg`
const chargeBlade = `${base}weapons/Charge_Blade/Charge_Blade_rank_01.svg`
const dualBlades = `${base}weapons/Dual_Blades/Dual_Blades_Rank_01.svg`
const greatSword = `${base}weapons/Great_Sword/Great_Sword_Rank_01.svg`
const gunLance = `${base}weapons/Gunlance/Gunlance_Rank_01.svg`
const hammer = `${base}weapons/Hammer/Hammer_Rank_01.svg`
const heavyBowGun = `${base}weapons/Heavy_Bowgun/Heavy_Bowgun_Rank_01.svg`
const huntingHorn = `${base}weapons/Hunting_Horn/Hunting_Horn_Rank_01.svg`
const insectGlaive = `${base}weapons/Insect_Glaive/Insect_Glaive_Rank_01.svg`
const lance = `${base}weapons/Lance/Lance_Rank_01.svg`
const lightBowGun = `${base}weapons/Light_Bowgun/Light_Bowgun_Rank_01.svg`
const longSword = `${base}weapons/Long_Sword/Long_Sword_Rank_01.svg`
const swordAndShield = `${base}weapons/Sword_and_Shield/Sword_&_Shield_Rank_01.svg`
const switchAxe = `${base}weapons/Switch_Axe/Switch_Axe_Rank_01.svg`

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