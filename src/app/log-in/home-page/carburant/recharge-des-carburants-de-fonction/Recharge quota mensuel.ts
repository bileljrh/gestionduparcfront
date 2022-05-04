import { CartePlafond } from "../carte-plafond/carte-plafond";

export class RechargeQuotaMensuel {
    id?: number;
    
    nom?: string;
    
    prenom?: string;

    matricule?: string;
    
    confirmed :boolean;
    
    validated :boolean;

    cartePlafond: CartePlafond;
}