import { Account, AccountInterface, BigNumberish, Call, num } from "starknet";
import { Entity, getComponentValue } from "@dojoengine/recs";
import { uuid } from "@latticexyz/utils";
import { ClientComponents } from "./createClientComponents";
import { Direction, stringToFelt, updatePositionWithDirection } from "../utils";
import {
    getEntityIdFromKeys,
    getEvents,
    setComponentsFromEvents,
} from "@dojoengine/utils";
import { ContractComponents } from "./generated/contractComponents";
import type { IWorld } from "./generated/generated";
import { SetupNetworkResult } from "./setupNetwork";

export type SystemCalls = ReturnType<typeof createSystemCalls>;

export type DojoCall = {
    contractName: string
    functionName: string
    callData: BigNumberish[]
  }
  

const lobby_call = (functionName: string, callData: any[]) => ({
    contractName: 'lobby',
    functionName,
    callData,
})

export function createSystemCalls(
    network: SetupNetworkResult,
    components: ClientComponents,
    manifest: any,
  ) {
    const { execute, executeMulti, call, contractComponents } = network

    const _executeTransaction = async (signer: AccountInterface, params: DojoCall | Call[]): Promise<boolean> => {
        let success = false
        try {
          let tx = null
          if (!Array.isArray(params)) {
            tx = await execute(signer, params.contractName, params.functionName, params.callData);
            console.log(`execute ${params.contractName}::${params.functionName}() tx:`, params.callData, tx)
          } else {
            tx = await executeMulti(signer, params)
            console.log(`executeMulti:`, params, ` tx:`, tx)
          }
    
          const receipt = await signer.waitForTransaction(tx.transaction_hash, { retryInterval: 200 })
          success = getReceiptStatus(receipt);
          (success ? console.log : console.warn)(`execute success:`, success, 'receipt:', receipt, 'params:', params)
    
          setComponentsFromEvents(contractComponents, getEvents(receipt));
        } catch (e) {
          console.warn(`execute exception:`, params, e)
        } finally {
        }
        return success
      }
    
      // const _executeCall = async (params: DojoCall): Promise<any | null> => {
      //   let results = null
      //   try {
      //     const eventData = await call(params.contractName, params.functionName, params.callData)
      //     // console.log(eventData)
      //     // result = decodeComponent(contractComponents['Component'], eventData.result)
      //     results = eventData.result.map(v => BigInt(v))
      //     // console.log(`call ${system}(${args.length}) success:`, result)
      //   } catch (e) {
      //     console.warn(`call ${params.contractName}::${params.functionName}(${params.callData.length}) exception:`, e)
      //   } finally {
      //   }
      //   return results
      // }
      
      const register_player = async (signer: AccountInterface, name: string): Promise<boolean> => {
        const args = [stringToFelt(name)]
        return await _executeTransaction(signer, lobby_call('register_player', args))
      }

      const choose_blobert = async(signer: AccountInterface, blobert_1: number, blobert_2: number, blobert_3: number, blobert_4: number, blobert_5: number, blobert_6: number): Promise<boolean> => {
        const args = [blobert_1, blobert_2, blobert_3, blobert_4, blobert_5, blobert_6]
        return await _executeTransaction(signer, lobby_call('choose_blobert', args))
      }

      const create_room_battle = async(signer: AccountInterface): Promise<boolean> => {
        return await _executeTransaction(signer, lobby_call('create_battle_room', []))
      }

      return {
        register_player,
        choose_blobert,
        create_room_battle
      }
  }

  function getReceiptStatus(receipt: any): boolean {
    if (receipt.execution_status != 'SUCCEEDED') {
      if (receipt.execution_status == 'REVERTED') {
        console.error(`Transaction reverted:`, receipt.revert_reason)
      } else {
        console.error(`Transaction error [${receipt.execution_status}]:`, receipt)
      }
    //   emitter.emit('transaction_error', {
    //     status: receipt.execution_status,
    //     reason: receipt.revert_reason,
    //   })
      return false
    }
    return true
  }
  
