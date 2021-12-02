import styles from "./styles.module.scss";
import classNames from "classnames";

import { useNavigate } from "react-router";
import { LogoFooter as Icon } from "@assets/Icons";

import fishesLeft from "./fishes-left.svg";
import fishesRight from "./fishes-right.svg";

import bigWave from "./big-wave.svg";

import N18 from "./18.svg";
import N26 from "./26.svg";
import N215 from "./215.svg";

import staff from "./staff.png";

import begginText from "./beggin-text-1.svg";
import twoFish from "./2-fish.svg";
import founders from "./founders.png";
import photo from "./photo.png";

import twoWaves from "./2-waves.svg";

import today from "./today.svg";
import worker1 from "./worker-1.png";

import ourFetures from "./our-features.svg";

import hands from "./hands.png";
import weGood from "./we-good.svg";

import mediumWaves from "./medium-waves.svg";

import fullFishes from "./full-fishes.svg";

export function NumberLabel({
  src,
  label,
  className = "w-32 h-28",
}: {
  src: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={classNames(className, "flex flex-col items-center")}>
      <img src={src} />
      <span className="mt-1 uppercase text-light text-lg font-medium">
        {label}
      </span>
    </div>
  );
}

export function AboutPageCover() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className={classNames("flex relative", styles.container)}>
          <div className={classNames(styles.containerLeft, "flex-grow")}>
            <div
              className={classNames(
                styles.containerLeftWrapper,
                "flex flex-col h-full justify-between"
              )}
            >
              <Icon />
              <p className={classNames("text-light lg:pr-4", styles.mainText)}>
                – это более 20 лет упорной работы в ресторанном бизнесе, свыше
                200 успешных проектов по всему миру, которых с каждым годом
                становится всё больше. Каждый день более 60 000 посетителей
                посещают более 215 ресторанов Ocean Basket в 18 странах мира,
                чтобы отведать нашу еду.
              </p>
              <img src={bigWave} className={styles.wave} />
              <div className="flex justify-around items-baseline">
                <NumberLabel src={N215} label={"ресторанов"} />
                <NumberLabel src={N26} label={"стран"} />
                <NumberLabel src={N18} label={"лет"} />
              </div>
            </div>
          </div>
          <div
            className={classNames(
              styles.containerRight,
              "flex flex-grow justify-end items-center"
            )}
          >
            <img src={fishesLeft} />
          </div>
        </div>
        <div className={styles.staff} />
      </div>
      <img className="w-full" src={staff} />
      <div className="flex flex-col md:px-4 lg:px-8 xl:px-32 pt-20 text-body font-normal">
        <div className="flex">
          <div className="w-1/2">
            <img src={begginText} />
            <p className="max-w-lg pt-14 pl-9">
              Когда первый ресторан Ocean Basket открыл свои двери в 1995 году,
              в Южной Африке только что прошли первые демократические выборы.
              Воздух был наполнен оптимизмом и опасением. А теперь, еще и
              вкусным ароматом готовых морепродуктов. Фатс и Джордж Лазаридис,
              братья греческого происхождения, увидели возможность создать
              что-то, что люди называют рестораном, где подают вкусные блюда из
              морепродуктов по доступным ценам. В те дни рестораны морепродуктов
              были созданы в основном для аристократии, а порция креветок была
              очень дорогой.
            </p>
          </div>
          <div className="w-1/2 flex justify-center items-center">
            <img src={twoFish} />
          </div>
        </div>

        <div className="flex pt-20">
          <div className="w-1/2 flex pt-20">
            <div className="flex flex-col">
              <div className="relative">
                <img
                  src={twoWaves}
                  className="absolute w-60 -top-3 -right-16"
                />
                <img src={founders} />
                <img src={photo} className="absolute -bottom-40 -right-16" />
              </div>
              <div className="flex flex-col text-base pl-2 pt-9">
                <span className="font-medium">Основатели</span>
                <span className="pt-1">Фатс и Джордж Лазаридис</span>
                <span className="text-xs mt-4 font-light">
                  *двое мужчин справа
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/2">
            <p className="max-w-lg">
              Первый ресторан Ocean Basket был открыт в Meynlyn park Centre
              города Претория, занимал он площадь всего 60 квадратных метров,
              где помещалось всего 6 столов. В меню было представлено всего
              несколько блюд, такие как: креветки, треска, кальмары и рыба
              Кинглип. Кроме того, арендодатель ввел ограничения, разрешив
              продавать только один вид вина и небольшой выбор безалкогольных
              напитков. Тогда Фатс предложил гостям приносить с собой
              собственные напитки и даже свои собственные салаты.
            </p>
            <div className="pt-24 pb-28 relative">
              <img
                src={mediumWaves}
                className="absolute right-0 lg:-mr-8 xl:-mr-32"
              />
            </div>
            <p className="max-w-lg">
              Фатс и Джордж Лазаридис были рождены для работы в ресторане, они
              знали каждого гостя по имени, а перед подачей пробовали блюда
              сами, чтобы убедиться в их безупречном вкусе. Вскоре Претория
              влюбилась в этот уютный и семейный средиземноморский ресторан.
            </p>
            <p className="max-w-lg mt-5">
              Мама братьев, Лиза Лазаридис, разработала для ресторана несколько
              десертов. Её стандарт обслуживания гостя лежит в основе тренингов
              для персонала ресторанов. А также наши фирменные булочки чиабатта
              — рецепт разработан Мамой Лизой, подаются всем гостям Ocean Basket
              вместе с тремя соусами: тар-тар, чесночный и чили.
            </p>
          </div>
        </div>

        <div className="pt-36 flex justify-center">
          <img src={twoWaves} />
        </div>

        <div className="flex pt-12 relative">
          <img
            src={fishesRight}
            className="absolute md:-ml-4 -bottom-12 lg:-ml-8 xl:-ml-32 w-64"
          />
          <div className="w-1/2">
            <img src={today} />
            <p className="max-w-lg pt-14 pl-9">
              На сегодняшний день существует более 215 ресторанов в 18 странах
              (включая Россию) по всему земному шару. От Дубая до Дурбана, от
              Нельспрута до Нигерии, вы найдете людей, которые разделяют нашу
              любовь к вкусным морепродуктам, нежному сливочно-лимонному соусу,
              мягким булочкам чиабатта, тех, кто ценит нашу щедрость и заботу
              при подаче морепродуктов.
            </p>
            <p className="max-w-lg pt-5 pl-9">
              Среди тех, кто приходит в московские рестораны Ocean Basket много
              тех, кто знает нас по заведениям на Кипре. Практически ежедневно
              мы получаем сообщения в директ и комментарии под постами с одной
              общей мыслью: «Мы были у вас на Кипре! Как здорово, что вы теперь
              в Москве». А наши официанты и менеджеры встречают гостей, знакомых
              с Ocean Basket, гости также говорят: «А мы у вас уже были, только
              на Кипре!».
            </p>
          </div>
          <div className="w-1/2 pt-6 flex justify-center items-center">
            <img src={worker1} />
          </div>
        </div>

        <div className="pt-36 flex justify-center">
          <img src={ourFetures} />
        </div>

        <div className="flex pt-24">
          <div className="w-1/2 flex justify-center relative">
            <img src={hands} />
            <img
              src={mediumWaves}
              className="absolute lg:-ml-8 xl:-ml-32 left-0 -bottom-7"
            />
          </div>
          <div className="w-1/2 pt-6">
            <div className="w-full flex justify-end">
              <img src={twoWaves} className="w-60 -mt-20" />
            </div>
            <ul className="max-w-xl">
              <li>- доступные цены на морепродукты;</li>
              <li className="pt-3">
                - морепродукты со всех уголков Земли: Япония, Аргентина,
                Фарерские Острова, Средиземное море, Чили, Новая Зеландия,
                Греция;
              </li>
              <li className="pt-3">
                - большие и сытные порции (самый популярное блюдо — Платтер на
                двоих);
              </li>
              <li className="pt-3">
                - всегда свежие и вкусные морепродукты — специальная система
                транспортировки;
              </li>{" "}
              <li className="pt-3">
                - комплимент каждому гостю: теплые булочки чиабатта и три вида
                соуса (перец чили в оливковом масле, тартар и чесночный соусы);
              </li>{" "}
              <li className="pt-3">
                - отдельная детская зона в каждом ресторане и детское меню; -
                история Ocean Basket начинается с 1995 г.
              </li>{" "}
              <li className="pt-3">
                — накопленный опыт, знания и традиции; - ресторан для
                Повседневной трапезы, мы рады каждому.
              </li>
            </ul>
            <div className="flex flex-col items-center pt-24 ">
              <img src={twoFish} className="w-40" />
              <div className="pt-7 text-center w-96">
                Это не просто сеть – это философия, которая выросла из первых 6
                столиков в городе Претория, ЮАР.
              </div>
            </div>
          </div>
        </div>

        <div className="flex pt-32 pb-28">
          <div className="w-1/2 flex justify-center">
            <img src={weGood} />
          </div>
          <div className="w-1/2 pt-6 font-normal flex justify-center items-center">
            <p className="max-w-md">
              Ocean Basket работает в сотрудничестве с SASSI (Southern African
              Sustainable Seafood Intiative), которая следит за популяцией
              морских обитателей в Мировом океане. Мы не используем в своих
              блюдах морепродукты из красного списка, например, в нашем меню вы
              не найдете угорь, из-за угрозы его исчезновения.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <img className="-mb-8" src={fullFishes} />
        </div>
      </div>
    </>
  );
}
