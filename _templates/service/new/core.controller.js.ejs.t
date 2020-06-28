---
to: core/controllers/<%= h.changeCase.paramCase(name) %>/<%= h.inflection.singularize(name) %>.controller.js
---
import {connectToDatabase} from "../../database/db_app"; 
import { mapPaginationResult } from "../../utils/pagination";
import <%= h.changeCase.pascal(h.inflection.singularize(name)) %>  from '../../models/<%= h.changeCase.pascal(h.inflection.singularize(name)) %>'; 

export const get<%= h.changeCase.pascal(h.inflection.singularize(name)) %> = async (id) => {
    await connectToDatabase();
    return <%= h.changeCase.pascal(h.inflection.singularize(name)) %>.findById(id);
};
export const get<%= h.changeCase.pascal(name) %> = async (next, previous) => {
    await connectToDatabase();
    const response = await <%= h.changeCase.pascal(h.inflection.singularize(name)) %>.findPaged({ next, previous });
    return mapPaginationResult(response);
};
export const create<%= h.changeCase.pascal(h.inflection.singularize(name)) %> = async (data) => {
    await connectToDatabase();
    return new <%= h.changeCase.pascal(h.inflection.singularize(name)) %>(data).save();
};
export const delete<%= h.changeCase.pascal(h.inflection.singularize(name)) %> = async (id) => {
    await connectToDatabase();
    return <%= h.changeCase.pascal(h.inflection.singularize(name)) %>.findByIdAndRemove(id);
}; 
export const update<%= h.changeCase.pascal(h.inflection.singularize(name)) %> = async (id,data) => {
    await connectToDatabase();
    return <%= h.changeCase.pascal(h.inflection.singularize(name)) %>.findOneAndUpdate({_id:id},
        data
    ,{
        new:true
    })
};