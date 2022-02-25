import { FILE_PATH } from "../../confi.js";

export default async ({ request, response, params}) => {
    const decoder = new TextDecoder();
    const encoder = new TextEncoder();
    try {
       const { value: { title, completed } } = await request.body();

       const data = await Deno.readFile(FILE_PATH);
       const todos = JSON.parse(decoder.decode(data));

       const updatedTodos = todos.map((todo) => {
           if(todo.id === Number(params.id)) {
               return { ...todo, title: title, completed: completed}

           }

           return todo;
       });
       await Deno.writeFile(FILE_PATH, encoder.encode(JSON.stringify(updatedTodos)));
       response.status = 204;
       response.body = { status: 'success', data: updatedTodos}


    } catch (error) {
        response.status = 502;
        response.body = { status: 'Failed to updated', error}
        
    }
}