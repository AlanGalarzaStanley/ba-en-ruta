import { Coffee, ExternalLink } from "lucide-react"
import { RESTAURANTS, type Restaurant } from "../lib/ba-config"
import { t, type CopyKey, type Lang } from "../lib/ba-copy"
import { GASTRO_MEAL_IDS, GASTRO_OPTIONAL_CAFE_ID, type GastroMealId } from "../lib/gastro-route"

type Props = {
  lang: Lang
  selectedMeal: GastroMealId
  includeCafe: boolean
  onMealChange: (meal: GastroMealId) => void
  onCafeChange: (include: boolean) => void
}

const mealOptions = GASTRO_MEAL_IDS
  .map((id) => RESTAURANTS.find((restaurant) => restaurant.id === id))
  .filter((restaurant): restaurant is Restaurant => Boolean(restaurant))
const optionalCafe = RESTAURANTS.find((restaurant) => restaurant.id === GASTRO_OPTIONAL_CAFE_ID)

export function GastroRouteChooser({ lang, selectedMeal, includeCafe, onMealChange, onCafeChange }: Props) {
  return (
    <section className="mt-4 rounded-2xl border border-gold/25 bg-[#0b1220]/90 p-4 sm:p-5">
      <fieldset aria-describedby="gastro-choice-hint" className="min-w-0">
        <legend className="font-display text-2xl text-white">{t(lang, "gastroChoiceTitle")}</legend>
        <p id="gastro-choice-hint" className="mt-1 text-sm leading-relaxed text-white/65">
          {t(lang, "gastroChoiceHint")}
        </p>
        <div className="mt-3 grid gap-2">
          {mealOptions.map((restaurant) => {
            const selected = selectedMeal === restaurant.id
            return (
              <div
                key={restaurant.id}
                className={`rounded-xl border p-3 transition-colors ${selected ? "border-gold/60 bg-gold/[0.08]" : "border-white/10 bg-white/[0.03]"}`}
              >
                <label
                  htmlFor={`gastro-meal-${restaurant.id}`}
                  className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg focus-within:outline focus-within:outline-2 focus-within:outline-gold"
                >
                  <input
                    id={`gastro-meal-${restaurant.id}`}
                    type="radio"
                    name="gastro-main-meal"
                    value={restaurant.id}
                    checked={selected}
                    aria-label={`${t(lang, "gastroSelectMeal")}: ${restaurant.name}`}
                    onChange={() => onMealChange(restaurant.id as GastroMealId)}
                    className="mt-1 h-5 w-5 shrink-0 accent-[#d9b45b]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <span className="font-medium text-white">{restaurant.name}</span>
                      <span className="text-[10px] uppercase tracking-[0.12em] text-gold/90">
                        {t(lang, restaurant.categoryKey as CopyKey)}
                      </span>
                    </span>
                    <span className="mt-1 block text-xs leading-relaxed text-white/70">
                      {t(lang, restaurant.descKey as CopyKey)}
                    </span>
                    <span className="mt-1 block text-[11px] text-white/50">{restaurant.address}</span>
                  </span>
                </label>
                {restaurant.url && (
                  <a
                    href={restaurant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${t(lang, "playerOfficialSite")}: ${restaurant.name}`}
                    className="ml-8 mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs text-gold hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
                  >
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    {t(lang, "playerOfficialSite")}
                  </a>
                )}
              </div>
            )
          })}
        </div>
      </fieldset>

      {optionalCafe && (
        <div className={`mt-3 rounded-xl border p-3 ${includeCafe ? "border-gold/50 bg-gold/[0.06]" : "border-white/10 bg-white/[0.03]"}`}>
          <label className="flex min-h-11 cursor-pointer items-start gap-3 focus-within:outline focus-within:outline-2 focus-within:outline-gold">
            <input
              type="checkbox"
              checked={includeCafe}
              aria-label={`${t(lang, "gastroCafeOptional")}: ${optionalCafe.name}`}
              onChange={(event) => onCafeChange(event.currentTarget.checked)}
              className="mt-1 h-5 w-5 shrink-0 accent-[#d9b45b]"
            />
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2 font-medium text-white">
                <Coffee className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                {t(lang, "gastroCafeOptional")}
              </span>
              <span className="mt-1 block text-xs leading-relaxed text-white/70">
                {t(lang, optionalCafe.descKey as CopyKey)}
              </span>
              <span className="mt-1 block text-[11px] text-white/50">{optionalCafe.address}</span>
            </span>
          </label>
          {optionalCafe.url && (
            <a
              href={optionalCafe.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t(lang, "playerOfficialSite")}: ${optionalCafe.name}`}
              className="ml-8 mt-2 inline-flex min-h-11 items-center gap-1.5 text-xs text-gold hover:text-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
            >
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              {t(lang, "playerOfficialSite")}
            </a>
          )}
        </div>
      )}
      <p className="mt-3 text-xs leading-relaxed text-white/50">{t(lang, "gastroNoBooking")}</p>
    </section>
  )
}
