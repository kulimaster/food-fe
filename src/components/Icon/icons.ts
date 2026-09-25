// Registry of Material Symbols (outlined, weight 400) used by <Icon>.
// Only icons listed here end up in the bundle. To add one: import it and add it to `icons`
// (and to `filledIcons` if a filled variant is needed). Browse: https://fonts.google.com/icons
// Note: some font ligatures are aliases with a different SVG file name
// (expand_more → keyboard_arrow_down, restaurant_menu → restaurant).
import type { FC, SVGProps } from 'react'
import AccountCircle from '@material-symbols/svg-400/outlined/account_circle.svg?react'
import Add from '@material-symbols/svg-400/outlined/add.svg?react'
import AddCircle from '@material-symbols/svg-400/outlined/add_circle.svg?react'
import Analytics from '@material-symbols/svg-400/outlined/analytics.svg?react'
import ArrowBack from '@material-symbols/svg-400/outlined/arrow_back.svg?react'
import ArrowForward from '@material-symbols/svg-400/outlined/arrow_forward.svg?react'
import BakeryDining from '@material-symbols/svg-400/outlined/bakery_dining.svg?react'
import CalendarMonth from '@material-symbols/svg-400/outlined/calendar_month.svg?react'
import CalendarToday from '@material-symbols/svg-400/outlined/calendar_today.svg?react'
import Check from '@material-symbols/svg-400/outlined/check.svg?react'
import ChevronLeft from '@material-symbols/svg-400/outlined/chevron_left.svg?react'
import ChevronRight from '@material-symbols/svg-400/outlined/chevron_right.svg?react'
import Close from '@material-symbols/svg-400/outlined/close.svg?react'
import Dashboard from '@material-symbols/svg-400/outlined/dashboard.svg?react'
import Delete from '@material-symbols/svg-400/outlined/delete.svg?react'
import DinnerDining from '@material-symbols/svg-400/outlined/dinner_dining.svg?react'
import DirectionsWalk from '@material-symbols/svg-400/outlined/directions_walk.svg?react'
import Edit from '@material-symbols/svg-400/outlined/edit.svg?react'
import Egg from '@material-symbols/svg-400/outlined/egg.svg?react'
import Error from '@material-symbols/svg-400/outlined/error.svg?react'
import Favorite from '@material-symbols/svg-400/outlined/favorite.svg?react'
import FitnessCenter from '@material-symbols/svg-400/outlined/fitness_center.svg?react'
import Grain from '@material-symbols/svg-400/outlined/grain.svg?react'
import Icecream from '@material-symbols/svg-400/outlined/icecream.svg?react'
import Info from '@material-symbols/svg-400/outlined/info.svg?react'
import KeyboardArrowDown from '@material-symbols/svg-400/outlined/keyboard_arrow_down.svg?react'
import Kitchen from '@material-symbols/svg-400/outlined/kitchen.svg?react'
import Language from '@material-symbols/svg-400/outlined/language.svg?react'
import LunchDining from '@material-symbols/svg-400/outlined/lunch_dining.svg?react'
import MenuBook from '@material-symbols/svg-400/outlined/menu_book.svg?react'
import MoreHoriz from '@material-symbols/svg-400/outlined/more_horiz.svg?react'
import MoreVert from '@material-symbols/svg-400/outlined/more_vert.svg?react'
import Notifications from '@material-symbols/svg-400/outlined/notifications.svg?react'
import Person from '@material-symbols/svg-400/outlined/person.svg?react'
import Remove from '@material-symbols/svg-400/outlined/remove.svg?react'
import Restaurant from '@material-symbols/svg-400/outlined/restaurant.svg?react'
import Search from '@material-symbols/svg-400/outlined/search.svg?react'
import ShoppingCart from '@material-symbols/svg-400/outlined/shopping_cart.svg?react'
import Sprint from '@material-symbols/svg-400/outlined/sprint.svg?react'
import Tune from '@material-symbols/svg-400/outlined/tune.svg?react'
import Visibility from '@material-symbols/svg-400/outlined/visibility.svg?react'
import VisibilityOff from '@material-symbols/svg-400/outlined/visibility_off.svg?react'
import BakeryDiningFill from '@material-symbols/svg-400/outlined/bakery_dining-fill.svg?react'
import DinnerDiningFill from '@material-symbols/svg-400/outlined/dinner_dining-fill.svg?react'
import FavoriteFill from '@material-symbols/svg-400/outlined/favorite-fill.svg?react'
import IcecreamFill from '@material-symbols/svg-400/outlined/icecream-fill.svg?react'
import LunchDiningFill from '@material-symbols/svg-400/outlined/lunch_dining-fill.svg?react'

type SvgComponent = FC<SVGProps<SVGSVGElement>>

export const icons = {
  account_circle: AccountCircle,
  add: Add,
  add_circle: AddCircle,
  analytics: Analytics,
  arrow_back: ArrowBack,
  arrow_forward: ArrowForward,
  bakery_dining: BakeryDining,
  calendar_month: CalendarMonth,
  calendar_today: CalendarToday,
  check: Check,
  chevron_left: ChevronLeft,
  chevron_right: ChevronRight,
  close: Close,
  dashboard: Dashboard,
  delete: Delete,
  dinner_dining: DinnerDining,
  directions_walk: DirectionsWalk,
  edit: Edit,
  egg: Egg,
  error: Error,
  favorite: Favorite,
  fitness_center: FitnessCenter,
  grain: Grain,
  icecream: Icecream,
  info: Info,
  keyboard_arrow_down: KeyboardArrowDown,
  kitchen: Kitchen,
  language: Language,
  lunch_dining: LunchDining,
  menu_book: MenuBook,
  more_horiz: MoreHoriz,
  more_vert: MoreVert,
  notifications: Notifications,
  person: Person,
  remove: Remove,
  restaurant: Restaurant,
  search: Search,
  shopping_cart: ShoppingCart,
  sprint: Sprint,
  tune: Tune,
  visibility: Visibility,
  visibility_off: VisibilityOff,
} satisfies Record<string, SvgComponent>

export type IconName = keyof typeof icons

export const filledIcons: Partial<Record<IconName, SvgComponent>> = {
  bakery_dining: BakeryDiningFill,
  dinner_dining: DinnerDiningFill,
  favorite: FavoriteFill,
  icecream: IcecreamFill,
  lunch_dining: LunchDiningFill,
}
