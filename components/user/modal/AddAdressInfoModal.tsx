import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {twMerge} from "tailwind-merge";
import useCreateUserAddress from "@/hooks/useCreateUserAddress";
import CustomCursor from "@/components/others/CustomCursor";
import AddressUser from "@/components/user/supports/AddressUser";
import {Address} from "@/interface";
import {z} from "zod";
import {useAuth} from "@clerk/nextjs";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addUserAddress} from "@/actions/user-address";
import toast from "react-hot-toast";

const User = z
    .object({
        namePerson: z
            .string({
                required_error: "Field is required",
                invalid_type_error:
                    "First name must be a string with a minimum length of 3 and a maximum length of 20",
            })
            .min(3, {
                message: "Must contain at least 3 characters",
            })
            .max(20, {
                message: "Must contain at most 20 characters",
            })
            .refine(value => /^[\p{L}\s]+$/u.test(value), {
                message: "Must only contain letters",
            })
            .refine(value => value.trim() !== "", {
                message: "Field is required",
            }),
        currentAddress: z
            .string({
                required_error: "Field is required",
                invalid_type_error:
                    "Current address must be a string with a minimum length of 3 and a maximum length of 20",
            })
            .min(3, {
                message: "Must contain at least 3 characters"
            })
            .refine(value => value.trim() !== "", {
                message: "Field is required",
            }),
        phone: z
            .string({
                required_error: "Field is required",
                invalid_type_error: "Phone must be a number",
            })
            .refine(value => /^\d+$/.test(value), {
                message: "Must only contain number",
            })
            .refine(value => value.trim() !== "", {
                message: "Field is required",
            }),
    });

function AddAdressInfoModal() {
    const createUserAddress = useCreateUserAddress()
    const user = useAuth()
    const [formErrors, setFormErrors] = useState<Record<string, string>>({})
    const [formData, setFormData] = useState<Address>({
        namePerson: "",
        phone: "",
        province: "",
        district: "",
        ward: "",
        currentAddress: "",
        userId: user.userId as string
    })

    useEffect(() => {
        const body = document.querySelector<HTMLElement>("body")
        if (createUserAddress.isOpen)
            document.querySelector<HTMLElement>("body")!.style.overflowY = "hidden"
        else
            document.querySelector<HTMLElement>("body")!.style.overflowY = "auto"
        setFormErrors({})
        setFormData({
            namePerson: "",
            phone: "",
            province: "",
            district: "",
            ward: "",
            currentAddress: "",
            userId: user.userId as string
        })
    }, [createUserAddress.isOpen])

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const handleChangeAnother = (key: string, value: string) => {
        setFormData({
            ...formData,
            [key]: value
        })
    }

    const queryClient = useQueryClient()

    const {mutateAsync: addAddressMutation} = useMutation({
        mutationFn: addUserAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["user-address"]})
            createUserAddress.onClose()
            toast.success("Successfully!")
        },
        onError: () => {
            toast.error("Failed!")
        }
    })
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const parsedUser = User.safeParse(formData);
        if (!parsedUser.success) {
            const error = parsedUser.error;
            let newErrors = {};
            for (const issue of error.issues) {
                newErrors = {
                    ...newErrors,
                    [issue.path[0]]: issue.message,
                };
            }
            if (formData.province === "") newErrors = {...newErrors, province: "Field is required"}
            else if (formData.district === "")
                newErrors = {
                    ...newErrors,
                    province: "",
                    district: "Field is required"
                }
            else if (formData.ward === "")
                newErrors = {
                    ...newErrors,
                    ward: "Field is required",
                    province: "",
                    district: ""
                }
            return setFormErrors(newErrors);
        }
        setFormErrors({});
        try {
            await addAddressMutation(formData)
        } catch (e) {
            console.log(e)
        }
    }

    console.log(formData)
    return <>
        <div onClick={createUserAddress.onClose}
             className={twMerge(`hidden fixed bg-black/40 inset-0 h-[100vh] z-[999] transition-all duration-500 z-[100] cursor-none`, createUserAddress.isOpen && `block`)}>
            <CustomCursor/>
        </div>
        <div
            className={twMerge(`fixed top-[50%] w-[70vw] min-w-[95%] sm:min-w-[350px] max-w-[450px] left-[50%] translate-x-[-50%]
                translate-y-[-50%] bg-white transition-all duration-300 origin-center scale-[0.001] z-[101] px-4`, createUserAddress.isOpen && `scale-100`)}>
            <h2 className={"font-bold mt-4 mb-6 text-lg"}>Add a new address</h2>
            <form onSubmit={handleSubmit}>
                <div className={""}>
                    <label className="block mb-1 text-sm" htmlFor="name">
                        Name
                    </label>
                    <input id="namePerson" name={"namePerson"} value={formData.namePerson} type="text"
                           placeholder="Enter Name"
                           onChange={handleChangeInput}
                           className="px-4 py-3 w-full rounded-[10px] border border-neutral-900 outline-none"/>
                    {formErrors.namePerson && <p className={"text-red-500 text-sm"}>{formErrors.namePerson}</p>}
                </div>
                <div className={"mt-3"}>
                    <label className="block mb-1 text-sm" htmlFor="email">
                        Mobile Number
                    </label>
                    <input id="phone" type="text" placeholder="Enter Mobile Number"
                           onChange={handleChangeInput}
                           value={formData.phone}
                           className="px-4 py-3 w-full rounded-[10px] border border-neutral-900 outline-none"/>
                    {formErrors.phone && <p className={"text-red-500 text-sm"}>{formErrors.phone}</p>}
                </div>
                <AddressUser onChange={handleChangeAnother} formErrors={formErrors}/>
                <div className={"mt-3"}>
                    <label className="block mb-1 text-sm" htmlFor="email">
                        Current Address
                    </label>
                    <input id="currentAddress" value={formData.currentAddress} onChange={handleChangeInput}
                           type="text"
                           placeholder="Enter Current Address"
                           className="px-4 py-3 w-full rounded-[10px] border border-neutral-900 outline-none"/>
                    {formErrors.currentAddress && <p className={"text-red-500 text-sm"}>{formErrors.currentAddress}</p>}
                </div>
                <div className={"flex gap-x-4 items-center pb-4 pt-6 w-full px-4"}>
                    <button type={"button"} className={"border border-[#acacac] font-bold py-3 flex-1"}
                            onClick={createUserAddress.onClose}>
                        CANCEL
                    </button>
                    <button type={"submit"} className={"bg-black text-white font-bold py-3 flex-1"}>
                        ADD NEW ADDRESS
                    </button>
                </div>
            </form>
        </div>

    </>
}


export default AddAdressInfoModal