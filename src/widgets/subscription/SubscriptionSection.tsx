import styles from "./styles.module.scss";
import classNames from "classnames";

import dishBacground2 from "./config/dish-background-2.png";
import dishBacground2_zip from "./config/dish-background-2.zip.png";
import emailDish from "./config/email-dish.png";

import Button from "@shared/button";
import Input from "@entities/payment/components/Forms/forms/input";
import productIcon from "@assets/product.svg";

import { ReactComponent as WhiteWaves } from "@shared/icons/white-waves.svg";
import blueWaves from "@shared/icons/blue-waves.svg";
import hook from "./hook.svg";
import wave from "./wave.svg";
import { createEffect, restore } from "effector";
import { getPosts, postSubscribe } from "@shared/api/dishes";
import { useStore } from "effector-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ImageWithPreview } from "@shared/components/ImageWithPreview";

const subscribeFx = createEffect(postSubscribe);

const EMAIL_MASK =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function EmailSection({ isWaves = false }) {
  const isLoading = useStore(subscribeFx.pending);

  const [error, setError] = useState<string>("");
  const [canMargin, setCanMargin] = useState<boolean>(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const onSuccess = subscribeFx.done.watch(() => {
      toast.success("Вы успешно подписались на рассылку");
      setEmail("");
    });

    const onFail = subscribeFx.fail.watch((error) => {
      console.error(error);
      toast.error("Ошибка подписки");
    });

    return () => {
      onSuccess();
      onFail();
    };
  }, []);

  const onSubscribeHandler = () => {
    if (!EMAIL_MASK.test(email)) {
      setError("Некорректный email");
      return;
    }
    subscribeFx(email);
  };

  return (
    <div className="relative">
      {isWaves && (
        <WhiteWaves className="absolute -mt-6 lg:-mt-10 z-10 hidden md:block" />
      )}
      <div
        className={classNames(
          "flex max-h-80 overflow-hidden relative",
          styles.promotionWrapperBackground
        )}
      >
        <ImageWithPreview
          loading="lazy"
          hugeSrc={dishBacground2}
          src={dishBacground2_zip}
          className={classNames("w-full h-full object-fill", styles.promotion)}
          alt="dish-background-2"
          onLoad={() => setCanMargin(true)}
        />
      </div>
      <div
        className={classNames(
          "flex justify-center drop-shadow-md",
          canMargin && "-mt-5 lg:-mt-56"
        )}
      >
        <div
          className={classNames(
            "bg-light flex justify-between rounded-3xl overflow-hidden max-w-[980px] sm:max-h-[336px]",
            styles.card
          )}
        >
          <img
            alt="suggestion"
            src={hook}
            className="absolute -bottom-32 hidden md:block"
          />
          <div
            className={classNames(
              "flex flex-col text-3xl font-bold px-12 py-12 justify-between relative flex-grow",
              styles.emailInput
            )}
          >
            <div className="sm:pt-3 text-body pb-7">
              Подпишись на наши обновления и получи подарок на первый заказ
            </div>
            <div className={classNames(error && styles.emailError)}>
              <div className={classNames("flex flex-col sm:flex-row text-lg")}>
                <Input
                  name="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => {
                    setError("");
                    setEmail(e.target.value);
                  }}
                  isButtonInput
                  className={classNames("text-base, flex-grow")}
                />
                <Button
                  className={classNames(
                    "text-accent hover:text-accent-hover mt-4 sm:mt-0 sm:max-w-[150px]"
                  )}
                  isInputButton
                  onClick={onSubscribeHandler}
                  disabled={isLoading}
                >
                  Подписаться
                </Button>
              </div>
              {error && (
                <p className="pt-[6px] text-sm text-start justify-self-end text-red-500">
                  {error}
                </p>
              )}
            </div>
          </div>

          <div
            className={classNames(
              "flex-shrink-0 hidden sm:block",
              styles.emailImg
            )}
          >
            <img
              loading="lazy"
              className={classNames("w-full h-full object-cover")}
              src={emailDish}
              alt="email dish"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InstagramHeader() {
  return (
    <div className="flex flex-col justify-center items-center">
      <span className="font-friends text-body text-6xl">Наш инстаграм</span>
      <span className="text-accent pt-2">Все последние новости о нас там</span>
      <a
        target="_blank"
        className="text-accent font-bold text-2xl pt-8 hover:underline"
        href="https://www.instagram.com/oceanbasket.ru/"
        rel="noreferrer"
      >
        @oceanbasket.ru
      </a>
      <img src={wave} alt="wave" className="pt-4" />
    </div>
  );
}

// const links = [
//   "https://www.instagram.com/p/CV2c5DUM0ZK/embed/",
//   "https://www.instagram.com/p/CVmrtbwstS0/embed/",
//   "https://www.instagram.com/p/CVe9Q2FsP9E/embed/",
//   "https://www.instagram.com/p/CU7PIw0s1ZI/embed/",
//   "https://www.instagram.com/p/CSg1LwXCWHk/embed/",
//   "https://www.instagram.com/p/CSMB3uqCfVW/embed/",
//   // "https://www.instagram.com/p/CR1Rjs9FQkD/embed/",
//   // "https://www.instagram.com/p/CRlt9IMiti9/embed/",
//   // "https://www.instagram.com/p/CROO8KlHL7a/embed/",
// ];

// function InstagramLoader({ id }: { id: string }) {
//   const [post, setPost] = useState<string | null>(null);
//   useEffect(() => {
//     getPostFx(id).then((post) => {
//       setPost(post);
//     });
//   }, [id]);

//   if (!post) return null;

//   return <InstagramItem url={post + "/embed/"} />;
// }

function InstagramItem({ url }: { url: string }) {
  const [isTimeoutExpired, setIsTimeoutExpired] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsTimeoutExpired(true);
    }, 15000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    if (isTimeoutExpired && !isLoaded) {
      setIsError(true);
    }
  }, [isLoaded, isTimeoutExpired]);

  if (isError) return null;

  return (
    <div
      className={classNames(
        "relative w-[350px] h-[350px] 2xl:w-[376px] 2xl:h-[376px] overflow-hidden"
      )}
    >
      {isError ? (
        <a href={url}>
          <img
            alt="productIcon"
            src={productIcon}
            className="w-full h-full border border-border-base"
          />
        </a>
      ) : (
        <iframe
          title={url}
          src={url}
          onLoad={() => {
            setIsLoaded(true);
          }}
          className={classNames(
            styles.instagramItem,
            "w-[350px] 2xl:w-[376px] h-[404px] 2xl:h-[430px]"
          )}
          frameBorder="0"
          scrolling="no"
        />
      )}
    </div>
  );
}

// const api_access_token =
//   "IGQVJWamFZAZAHBmUG1rTGU3WVcxVDBFNDA1bWdIWlZAPNE42SE41WlMzM0RxX0dvS3RRRFFkWVVoQnJCVEJUQjNsY3paY1hsQjhGWW9QVDJUOTFlUlVfcGNIa0RZAelRkYmlya0QtRUhWWVhydEFGVUlSTgZDZD";

// const getInstagramPostsFx = createEffect<void, string[]>(async () => {
//   const res = await axios.get("https://graph.instagram.com/me/", {
//     params: {
//       access_token: api_access_token,
//       fields: "media",
//     },
//   });
//   const resObject: { media: { data: [{ id: string }] } } = res.data;
//   return resObject.media.data.map(({ id }) => id);
// });

// const getPostFx = createEffect<string, string>(async (id) => {
//   const res = await axios.get(`https://graph.instagram.com/${id}`, {
//     params: {
//       access_token: api_access_token,
//       fields: "permalink",
//     },
//   });
//   return res.data.permalink;
// });

// const instGate = createGate();

// forward({
//   from: instGate.open,
//   to: getInstagramPostsFx,
// });

const getPostsFx = createEffect(getPosts);
const $posts = restore(getPostsFx.doneData, []);

function InstagramGalery() {
  useEffect(() => {
    getPostsFx();
  }, []);

  const posts = useStore($posts);

  return (
    <div className="flex justify-center md:px-4 lg:px-8 xl:px-32">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 grid-rows-2 gap-5">
        {/* {ids?.map((id) => (
          <InstagramLoader id={id} key={id} />
        ))} */}
        {posts.map((url) => (
          <InstagramItem url={url + "embed/"} key={url} />
        ))}
      </div>
    </div>
  );
}

const clientToken = "71e4f3e24255c3916006ac5b5a99415e";
const appId = "676058906894334";

export const accessToken = `${appId}|${clientToken}`;

export function SubscriptionSection({ isWaves = false }) {
  return (
    <div>
      <EmailSection isWaves={isWaves} />
      <div className="flex justify-center pt-24 lg:pt-36 relative">
        <img
          alt="blue waves"
          src={blueWaves}
          className="absolute right-0 top-28 hidden lg:block"
        />
        <InstagramHeader />
      </div>
      <div className="pt-9 sm:pb-18 lg:pb-28">
        <InstagramGalery />
      </div>
    </div>
  );
}
