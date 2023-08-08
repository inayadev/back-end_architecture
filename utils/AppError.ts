export enum httpCode{
    ok = 200,
    Created = 201,
    bad_request = 400,
    Uauthorized = 401,
    Forbidden = 403,
    Not_found = 404,
    Conflict = 409,
    Internal_server_error = 500
}


interface AppErrorArgument{
    name?: string,
    isoperational?: boolean,
    message: string,
    httpcode:httpCode
}

export class appError extends Error{
    public readonly name:string;
    public readonly isoperational: boolean = true
    public readonly httpcode:httpCode;

    constructor(args:AppErrorArgument){
        super(args.message)


  Object.setPrototypeOf(this,new.target.prototype)

    this.name = args.name || "Error"
    this.httpcode = args.httpcode
    
    if(args.isoperational !== undefined){
        this.isoperational = args.isoperational
    }

    Error.captureStackTrace(this)
    }
    
    

}

