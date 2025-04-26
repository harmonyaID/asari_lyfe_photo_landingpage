import { FC } from "react";
import { RatingProps } from "./props";
import { Star } from "@/components/icons";

export const Rating : FC<RatingProps> = ({
    value,
    size = "1rem"
}) => (
    <div 
        title={`Rating: ${value} / 5`}
        className="d-flex text-warning"
    >
        <Star
            className="flex-grow-0 flex-shrink-0"
            width={size}
            height={size}
            variant={ 
                value <= 0 ? 'empty' : 
                value < 1 ? 'half' :
                'full'
            }
        />
        <Star
            className="flex-grow-0 flex-shrink-0"
            width={size}
            height={size}
            variant={ 
                value <= 1 ? 'empty' : 
                value < 2 ? 'half' :
                'full'
            }
        />
        <Star
            className="flex-grow-0 flex-shrink-0"
            width={size}
            height={size}
            variant={ 
                value <= 2 ? 'empty' : 
                value < 3 ? 'half' :
                'full'
            }
        />
        <Star
            className="flex-grow-0 flex-shrink-0"
            width={size}
            height={size}
            variant={ 
                value <= 3 ? 'empty' : 
                value < 4 ? 'half' :
                'full'
            }
        />
        <Star
            className="flex-grow-0 flex-shrink-0"
            width={size}
            height={size}
            variant={ 
                value <= 4 ? 'empty' : 
                value < 5 ? 'half' :
                'full'
            }
        />
    </div>
)