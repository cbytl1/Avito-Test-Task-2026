import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import styles from './ProductCard.module.css';

type CardType = {
    category: "auto" | "real_estate" | "electronics";
    title: string;
    price: number;
    needsRevision: boolean;
}

type CardProps = {
    card: CardType;
}


const ProductCard: React.FC<CardProps> = ({card}) => {
    const category = {
        "auto" : "Авто",
        "real_estate" : "Недвижимость", 
        "electronics" : "Электроника" 
    }

    return (
        <Card className={styles.card} sx={{
            maxWidth: 200,
            borderRadius: "1rem",
            border: "1px solid #f0f0f0",
            boxShadow: "none"
        }}>
            <CardActionArea sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
            }}>
                <CardMedia
                component="img"
                height="150"
                image="/public/cover.jpg"
                alt="cover"
                />
                <CardContent className={styles["card__content"]}>
                <Typography variant="body2" className={styles.category}>
                    {category[card.category]}
                </Typography>
                <h3 className={styles.title}>
                    {card.title}
                </h3>
                <p className={styles.price}>{card.price} ₽</p>
                {card.needsRevision && <p className={styles["need__revision"]}>
                    Требует доработок
                </p>}
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default ProductCard;